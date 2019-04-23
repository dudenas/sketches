// style
let clrs = [
	[250, 250, 250], 5, [255, 0, 85],
	5
];
let alpha = 25;

// debug
let fr;
let debug = false;
let graphic = false;
let saveButton;

// interval
let interval = 1;
let intervalFrames = 1;

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(800, 500);
	pixelDensity(2);

	background(clrs[0][0], clrs[0][1], clrs[0][2]);
	background(clrs[1], alpha);

	dataSetup();
	fieldSetup();

	// framerate Setup
	fr = createP('');

	// save Image
	saveButton = createButton('save');
	saveButton.mousePressed(saveImage);

	if(graphic) debug = true;
	else debug = false;
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
	if (graphic) background(clrs[0]);
	else bgDraw();

	// debug information
	if (debug) {
		fieldDraw();
	}

	// update data / field / particle
	dataUpdate();
	fieldUpdate();
	if (graphic);
	else particlesUpdate();

	// framrate Draw
	fr.html(floor(frameRate()));
}

//————————————————————————————————————————————————————————————————————————————————— keyPressed
function keyPressed() {
	if (key == ' ') debug = !debug;
}

//————————————————————————————————————————————————————————————————————————————————— bgDraw
function bgDraw() {
	noStroke();
	fill(clrs[0][0], clrs[0][1], clrs[0][2], alpha);
	rect(0, 0, width, height);
}

//————————————————————————————————————————————————————————————————————————————————— save
function saveImage() {
	let name = `${frameCount + floor(random(1) * 100)}`;
	save(name);
}