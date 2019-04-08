let incr = 0.1;
let incr_zoff = 0.001;
let scl = 20;
let cols, rows;
let fr;
let zoff = 0;
let particles = [];
let totalParticles = 4000;
let flowField = [];
let followStrength = 0.3;
let maxSpeed = 3;
let alpha = 5;
let showField = false;
let SW = 1;
let clrs = [250, 5];
let sclSpeed = 0.01;

function setup() {
	createCanvas(600, 600, P2D);
	cols = floor(width / scl);
	rows = floor(height / scl);
	fr = createP('');

	for (let i = 0; i < totalParticles; i++) {
		particles[i] = new Particle();
	}
	saveSetup();

	background(clrs[0]);
}

function updateScl() {
	cols = floor(width / scl);
	rows = floor(height / scl);
	scl = map(sin(frameCount * sclSpeed), -1, 1, 10, 30);
}

function draw() {
	updateScl();
	if (showField) {
		background(250);
	}
	let yoff = 0;
	for (let y = 0; y < rows; y++) {
		let xoff = 0;
		for (let x = 0; x < cols; x++) {
			let index = (x + y * cols);
			let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
			let v = p5.Vector.fromAngle(angle);
			v.setMag(followStrength);
			flowField[index] = v;
			xoff += incr;
			if (showField) {
				stroke(5, 125);
				strokeWeight(SW);
				noFill();
				push();
				translate(x * scl, y * scl);
				rotate(v.heading());
				line(0, 0, scl, 0);
				pop();
			}
		}
		yoff += incr;
	}
	fr.html(floor(frameRate()));
	zoff += incr_zoff;

	for (let p of particles) {
		p.follow(flowField);
		p.update();
		p.edges();
		p.show();
	}

	saveDraw();
}