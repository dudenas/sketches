let song;
let amplitude, fft;
let peakDetect = [];
let level;

let clrs;
let SW;

let maxSpeed, speed;

let walkers = [];
let scl = 1;
let prevAmount = 20;
let aplha = 25;

//———————————————————————————————————— setupVariables
function setupVariables() {
	// setup variables
	clrs = {
		'bg': [250, 250, 250],
		'main': [5, 5, 5],
		'sub': [85, 0, 255]
	}

	amplitude = new p5.Amplitude();
	fft = new p5.FFT();

	peakDetect[0] = new p5.PeakDetect(20, 500, 0.35, 120);
	peakDetect[0].onPeak(triggerLow);
	peakDetect[1] = new p5.PeakDetect(20, 2000, 0.5, 60);
	peakDetect[1].onPeak(triggerMed);
	peakDetect[2] = new p5.PeakDetect(500, 20000, 0.01, 120);
	peakDetect[2].onPeak(triggerHigh);

	walkers.push(new Walker());
	speed = 0.05;
	maxSpeed = 50;

	SW = 2;
}

//———————————————————————————————————— preload
function preload() {
	myDiv = createDiv('press me');
	myDiv.position(windowWidth / 2, windowHeight / 2);
	song = loadSound('data/song.mp3', () => {
		song.loop();
		song.jump(36);
		console.log('song is loaded');
	});
}

//———————————————————————————————————— setup
function setup() {
	createCanvas(windowWidth, windowHeight);
	setupVariables();
	pixelDensity(2);
}

//———————————————————————————————————— draw
function draw() {
	if (getAudioContext().state || !divRemoved) {
		myDiv.remove();
		divRemoved = true;
	}
	//background(clrs['bg']);
	alpha = map(level, 0, 1, 5, 255);
	scl = map(level, 0, 1, 1, 2);
	SW = map(level, 0, 1, 1, 24);
	noStroke();
	fill(clrs['bg'][0], clrs['bg'][1], clrs['bg'][2], alpha);
	rect(0, 0, width, height);

	fft.analyze();
	peakDetect.forEach(elm => elm.update(fft));
	level = amplitude.getLevel();

	walkers.forEach(elm => {
		elm.move();
		elm.update();
		elm.show();
	})

	noFill();
	stroke(clrs['main'][0], clrs['main'][1], clrs['main'][2]);
	strokeWeight(0.2);
	beginShape();
	walkers.forEach((elm, index) => {
		vertex(elm.pos.x, elm.pos.y);
	});
	endShape();

	if (level < 0.1 || level > 0.9) removeWalkers();
}
//———————————————————————————————————— sound
function touchStarted() {
	if (getAudioContext().state !== 'running') {
		getAudioContext().resume();
	}
}

function removeWalkers() {
	let walkersSize = level * 100 * scl;
	if (walkersSize < walkers.length && walkers.length > 1) {
		walkers.splice(0, 1);
	}
}

//———————————————————————————————————— trigger
function triggerLow() {
	walkers.forEach(elm => {
		if (random(1) > 0.2) {
			elm.nextPoint();
		}
	})

	if (random(1) > 0.8) changeColor();
}

function triggerMed() {
	walkers.forEach(elm => {
		if (random(1) > 0.5) {
			let force = map(level, 0, 1, 10, 50);
			elm.acc.x = random(-force, force);
			elm.acc.y = random(-force, force);
		}
	})
}

function triggerHigh() {
	let walkersSize = level * 15 * scl;
	let special = false;
	walkers.forEach(elm => {
		if (elm.special) special = true;
	})
	for (let i = 0; i < walkersSize; i++) {
		if (!special && i == 0) special = true;
		else special = false;
		let p = new Walker(walkers[walkers.length - 1].pos, special);
		walkers.push(p);
	}
}

function changeColor() {
	let temp = clrs['bg'];
	clrs['bg'] = clrs['main'];
	clrs['main'] = temp;
}