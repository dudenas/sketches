let clrs = [250, 5, [255, 0, 85]];
let fr;
let debug = true;

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(960, 540);

	particlesSetup();

	// framerate Setup
	fr = createP('');
}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);
	// debug information
	if (debug) {}

	particlesDraw();

	// framrate Draw
	fr.html(floor(frameRate()));
}