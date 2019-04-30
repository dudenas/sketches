// style
let clrs = [
	[50, 65, 185], 5, [255, 0, 85], 250
];
let alpha = 5;

// debug
let fr;
let debug = false;

// interval
let interval = 1;
let intervalFrames = 1;

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(2);

	background(clrs[0][0], clrs[0][1], clrs[0][2]);
	background(clrs[1], alpha);

	dataSetup();
	fieldSetup();

	// framerate Setup
	fr = createP('');
}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	// set interval and update it
	if (intervalFrames % interval == 0) {
		generateWave();
		interval = floor(map(currValue, 0, 2, 100, 25));
		intervalFrames = 0;
	}
	intervalFrames++;

	// draw background
	bgDraw();

	// debug information
	if (debug) {
		fieldDraw();
	}

	// update data / field / particle
	dataUpdate();
	fieldUpdate();
	particlesUpdate();

	// framrate Draw
	fr.html(floor(frameRate()));
}

//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function keyPressed() {
	if (key == ' ') debug = !debug;
	if (key == 's') {
		noLoop();
	}
	if (key == 'b') loop();
}

//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function bgDraw() {
	noStroke();
	fill(clrs[0][0], clrs[0][1], clrs[0][2], alpha);
	rect(0, 0, width, height);
}