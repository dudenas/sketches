let clrs = {
	'bg': [5, 5, 5],
	'main': [250, 250, 250],
	'sub': [85, 0, 255]
};

// style
let SW = 4;

// bezier points
let x1, y1, x2, y2, x3, y3, x4, y4;
let incr;

// saving
let save = false;
let totalFrames = 300;
let capturer;

//———————————————————————————————————— setupVariable
function setupVariables() {
	// first anchor point
	x1 = 0;
	y1 = 0;
	// second control point
	// a b
	x2 = width/2;
	y2 = height / 2;
	// c
	// x2 = width;
	// y2 = 0;
	// d
	// x2 = width / 2;
	// y2 = height;
	// second control point
	// a b c
	x3 = width / 2;
	y3 = height / 2;
	// d
	// x3 = 0;
	// y3 = 0;
	// second anchor point
	x4 = width;
	y4 = 0;
}

//———————————————————————————————————— setup
function setup() {
	createCanvas(600, 600);
	pixelDensity(2);
	setupVariables();
	if (save) {
		saveSetup();
	}
	background(color(clrs['bg']));
}

//———————————————————————————————————— draw
function draw() {
	background(color(clrs['bg']));
	noFill();
	stroke(color(clrs['main']));
	strokeWeight(SW);
	bezier(x1, y1, x2, y2, x3, y3, x4, y4);

	// animation
	let percent = (frameCount / (totalFrames / 4));

	// a
	if (percent <= 1) {
		y4 = map(percent, 0, 1, 0, height);
	} else if (percent <= 2) {
		x4 = map(percent, 1, 2, width, 0);
	} else if (percent <= 3) {
		y4 = map(percent, 2, 3, height, 0);
	} else if (percent <= 4) {
		x4 = map(percent, 3, 4, 0, width);
	}

	// b
	// if (percent <= 1) {
	// 	x2 = map(percent, 0, 1, width/2, width);
	// 	y4 = map(percent, 0, 1, 0, height);
	// } else if (percent <= 2) {
	// 	x2 = map(percent, 1, 2, width, width/2);
	// 	x4 = map(percent, 1, 2, width, 0);
	// } else if (percent <= 3) {
	// 	x2 = map(percent, 2, 3, width/2, width);
	// 	y2 = map(percent, 2, 3, height/2, height);
	// 	y4 = map(percent, 2, 3, height, 0);
	// } else if (percent <= 4) {
	// 	x2 = map(percent, 3, 4, width, width/2);
	// 	y2 = map(percent, 3, 4, height, height/2);
	// 	x4 = map(percent, 3, 4, 0, width);
	// }

	// c
	// if (percent <= 1) {
	// 	y4 = y2 = map(percent, 0, 1, 0, height);
	// } else if (percent <= 2) {

	// 	x4 = x2 = map(percent, 1, 2, width, 0);
	// } else if (percent <= 3) {

	// 	y4 = y2 = map(percent, 2, 3, height, 0);
	// } else if (percent <= 4) {

	// 	x4 = x2 = map(percent, 3, 4, 0, width);
	// }

	// d
	// if (percent <= 1) {
	// 	y4 = map(percent, 0, 1, 0, height);

	// 	y3 = map(percent, 0, 1, 0, height);
	// } else if (percent <= 2) {
	// 	x4 = map(percent, 1, 2, width, 0);

	// 	y3 = map(percent, 1, 2, height, 0);
	// } else if (percent <= 3) {
	// 	y4 = map(percent, 2, 3, height, 0);

	// 	y3 = map(percent, 2, 3, 0, height);
	// } else if (percent <= 4) {
	// 	x4 = map(percent, 3, 4, 0, width);

	// 	y3 = map(percent, 3, 4, height, 0);
	// }

	saveDraw();
}

//———————————————————————————————————— save
// in initialization phase
function saveSetup() {
	capturer = new CCapture({
		format: 'png',
		framerate: 60,
		verbose: true
	});
	capturer.start();
}

function saveDraw() {
	if (save) {
		capturer.capture(canvas);
		if (frameCount == totalFrames + 1) {
			capturer.stop();
			capturer.save();
		}
	}
}