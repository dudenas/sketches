let clrs = [250, 5];
let r = 4;
let maxSpeed = 4;
let maxParticles = 50;
let particles = [];
let debug = false;
let fr;
let incr = 0.005;

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(960, 540);
	for (let i = 0; i < maxParticles; i++) {
		let p = new Particle(random(width), random(height))
		particles.push(p);
	}
	fieldSetup();
	fr = createP('');
}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);
	if (debug) {
		fieldDraw();
	}
	fieldUpdate();
	for (let p of particles) {
		p.render();
	}
	fr.html(floor(frameRate()));
	time += incr;
}

//————————————————————————————————————————————————————————————————————————————————— keypressed
function keyPressed() {
	if (key == " ") debug = !debug;
}