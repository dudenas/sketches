let clrs = [250, 5, [255, 0, 85]];
let r = 4;
let maxSpeed = 4;
let maxR = r * 3;
let maxParticles = 75;
let particles = [];
let debug = false;
let fr;
let incr = 0.005;
let alpha = 25;
let interval = 1;
let intervalFrames = 1;

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(960, 540);
	dataSetup();

	fieldSetup();
	fr = createP('');
}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	// set interval
	if (intervalFrames % interval == 0) {
		generateWave();
		interval = floor(map(currValue, 0, 2, 100, 25));
		intervalFrames = 0;
	}
	intervalFrames++;
	// console.log(particles.length);

	// draw background
	// background(clrs[0]);
	bgDraw();

	// redraw canvas
	if (update) {
		day = month[DAY];
		fieldSetup();
		update = false;
	}

	// debug information
	if (debug) {
		fieldDraw();
	}

	dataUpdate();

	// update information
	updateSpeed();
	fieldUpdate();
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].render();
		if (particles[i].finnished) {
			particles.splice(i, 1);
		}
	}
	time += incr;

	//draw framrate
	fr.html(floor(frameRate()));
}

//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function bgDraw() {
	noStroke();
	fill(clrs[0], alpha);
	rect(0, 0, width, height);
}


//————————————————————————————————————————————————————————————————————————————————— keypressed
function keyPressed() {
	if (key == " ") debug = !debug;
}