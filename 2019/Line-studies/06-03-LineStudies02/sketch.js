let clrs = {
	'bg': [5, 5, 5],
	'main': [250, 250, 250],
	'sub': [85, 0, 255]
};

// style
let SW = 2;
let type;

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
	// a
	// x2 = width;
	// y2 = height;
	// // b
	// x2 = 0;
	// y2 = 0;
	// c
	// x2 = width/2;
	// y2 = 0;
	// // d
	// x2 = 0;
	// y2 = height /2;
	// e
	x2 = width;
	y2 = height;
	// second control point
	// a
	// x3 = width;
	// y3 = height;
	// // b
	// x3 = width;
	// y3 = height;
	// c
	// x3 = width / 2;
	// y3 = height;
	// // d
	// x3 = 0;
	// y3 = height / 2;
	// e
	x3 = width;
	y3 = 0;
	// second anchor point
	x4 = width;
	y4 = 0;
}

//———————————————————————————————————— preload

function preload() {
	type = loadFont("data/circular-book.otf");
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

	textFont(type);
}

//———————————————————————————————————— draw
function draw() {
	background(color(clrs['bg']));
	noFill();
	stroke(color(clrs['main']));
	strokeWeight(SW);
	bezier(x1, y1, x2, y2, x3, y3, x4, y4);

	// animation
	let percent = ((frameCount % (totalFrames + 1)) / (totalFrames / 4.0));

	// // a
	// if (percent <= 1) {
	// 	y4 = map(percent, 0, 1, 0, height);
	// } else if (percent <= 2) {
	// 	x4 = map(percent, 1, 2, width, 0);
	// } else if (percent <= 3) {
	// 	y4 = map(percent, 2, 3, height, 0);
	// } else if (percent <= 4) {
	// 	x4 = map(percent, 3, 4, 0, width);
	// }
	// b
	// if (percent <= 1) {
	// 	y4 = map(percent, 0, 1, 0, height);
	// } else if (percent <= 2) {
	// 	x4 = map(percent, 1, 2, width, 0);
	// } else if (percent <= 3) {
	// 	y4 = map(percent, 2, 3, height, 0);
	// } else if (percent <= 4) {
	// 	x4 = map(percent, 3, 4, 0, width);
	// }

	// c
	if (percent <= 1) {
		y4 = map(percent, 0, 1, 0, height);
	} else if (percent <= 2) {
		x4 = map(percent, 1, 2, width, 0);
	} else if (percent <= 3) {
		y4 = map(percent, 2, 3, height, 0);
	} else if (percent <= 4) {
		x4 = map(percent, 3, 4, 0, width);
	}

	// render txt
	txtDraw();

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
		if (frameCount == totalFrames + 2) {
			capturer.stop();
			capturer.save();
		}
	}
}

function txtDraw() {
	let padding = 24;
	noStroke();
	fill(clrs['main']);
	textSize(16);
	textAlign(LEFT, CENTER);
	translate(0, padding * 8 / 2);
	text(x1.toFixed(0), width / 2, height / 2 - 8 * padding);
	text(y1.toFixed(0), width / 2, height / 2 - 7 * padding);
	text(x2.toFixed(0), width / 2, height / 2 - 6 * padding);
	text(y2.toFixed(0), width / 2, height / 2 - 5 * padding);
	text(x3.toFixed(0), width / 2, height / 2 - 4 * padding);
	text(y3.toFixed(0), width / 2, height / 2 - 3 * padding);
	text(x4.toFixed(0), width / 2, height / 2 - 2 * padding);
	text(y4.toFixed(0), width / 2, height / 2 - 1 * padding);
	textAlign(RIGHT, CENTER);
	text('x1', width / 2 - padding, height / 2 - 8 * padding);
	text('y1', width / 2 - padding, height / 2 - 7 * padding);
	text('x2', width / 2 - padding, height / 2 - 6 * padding);
	text('y2', width / 2 - padding, height / 2 - 5 * padding);
	text('x3', width / 2 - padding, height / 2 - 4 * padding);
	text('y3', width / 2 - padding, height / 2 - 3 * padding);
	text('x4', width / 2 - padding, height / 2 - 2 * padding);
	text('y4', width / 2 - padding, height / 2 - 1 * padding);

}