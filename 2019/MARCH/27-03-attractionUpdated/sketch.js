let clrs = [5, 250, [85, 0, 255]];
let SW = 1;

let attractors = [];
let particles = [];
let totalParticles = 400;
let totalAttractors = 8;

let song;
let amplitude;
let level;
let opc = 15;
let speed = 4;

//———————————————————————————————————— preload
function preload() {
	song = loadSound('data/song.mp3', () => {
		song.loop();
		console.log('song is loaded');
	});
}

function setup() {
	createCanvas(540, 540);
	pixelDensity(2);
	amplitude = new p5.Amplitude();
	background(clrs[0]);
	setupGrfc();
}

function draw() {
	blendMode(ADD);

	level = amplitude.getLevel();
	opc = map(level, 0, 0.3, 1, 5);
	let chance = map(level, 0, 0.3, 1, 0);
	speed = map(level, 0.2, 0.3, 0, 4);

	if (random(1) > 0.5 && particles.length < totalParticles) {
		addParticle();
	}

	particles.forEach(elm => {
		elm.show();
		elm.update();
		attractors.forEach(target => {
			if (random(1) > chance) elm.attracted(target);
			elm.attracted(target);
		})
	})

}

function mousePressed() {
	setupGrfc();
}

function keyPressed(){
	if(key == 'S') save(`${frameCount}.png`);
}

function setupGrfc() {
	blendMode(NORMAL);
	background(clrs[0]);

	attractors = [];
	particles = [];
	for (let i = 0; i < totalAttractors; i++) {
		let a = new Particle(random(width), random(height), 8, 255, random(1) > 0.2);
		attractors.push(a);
	}
	for (let i = 0; i < totalParticles / 10; i++) {
		addParticle();
	}
}

function addParticle() {
	let p = new Particle(random(width), random(height));
	particles.push(p);
}