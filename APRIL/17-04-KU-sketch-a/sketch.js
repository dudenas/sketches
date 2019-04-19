let clrs = [250, 5, [255, 0, 85]];
let r = 4;
let maxSpeed = 4;
let maxParticles = 200;
let particles = [];
let debug = false;
let fr;
let incr = 0.005;
let alpha = 25;

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(960, 540);
	dataSetup();
	for (let i = 0; i < maxParticles; i++) {
		let p = new Particle(random(width), random(height))
		particles.push(p);
	}
	fieldSetup();
	fr = createP('');


}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
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
	for (let p of particles) {
		p.render();
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