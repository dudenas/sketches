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

//———————————————————————————————————— setupVariable
function setupVariables() {
	grfcSetup();
}

//———————————————————————————————————— preload

function preload() {
	type = loadFont("data/circular-book.otf");
}

//———————————————————————————————————— setup
function setup() {
	createCanvas(600, 600).parent('canvas_css');
	pixelDensity(2);
	setupVariables();
	background(color(clrs['bg']));

	textFont(type);
	slidersSetup();

	saveSetup();
	if (save) {
		capturer.start();
	}
}
let theta = 0;

//———————————————————————————————————— draw
function draw() {
	// slidersDraw();
	background(color(clrs['bg']));

	push();
	translate(width / 2, height / 2);
	rotate(-PI/2);
	translate(-width / 2, -height / 2);
	// render line and update it's points
	grfcDraw();
	pop();

	// render txt
	txtDraw();

	saveDraw();
}

//———————————————————————————————————— sliders
let x2_s, x3_s, y2_s, y3_s;

function slidersSetup() {
	x2_s = createSlider(0, width, width / 2, 1).parent('x2_s');
	y2_s = createSlider(0, height, height / 2, 1).parent('y2_s');
	x3_s = createSlider(0, width, width / 2, 1).parent('x3_s');
	y3_s = createSlider(0, height, height / 2, 1).parent('y3_s');
}

function slidersDraw() {
	x2 = x2_s.value();
	y2 = y2_s.value();
	x3 = x3_s.value();
	y3 = y3_s.value();
}

//———————————————————————————————————— text
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