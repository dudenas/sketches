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

// version
let version = 'd';

//———————————————————————————————————— setupVariable
function setupVariables() {
	// first anchor point
	x1 = 0;
	y1 = 0;
	switch (version) {
		case 'a':
			// first control point
			x2 = width;
			y2 = height;
			// second control point
			x3 = width;
			y3 = height;
			break;
		case 'b':
			// first control point
			x2 = width / 2;
			y2 = height / 2;
			// second control point
			x3 = width;
			y3 = 0;
			break;
		case 'c':
			// first control point
			x2 = width;
			y2 = 0;
			// second control point
			x3 = 0;
			y3 = height;
			break;
		case 'd':
			// first control point
			x2 = 0;
			y2 = height;
			// second control point
			x3 = width;
			y3 = height;
			break;
	}
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

//———————————————————————————————————— draw
function draw() {
	//slidersDraw();

	background(color(clrs['bg']));
	noFill();
	stroke(color(clrs['main']));
	strokeWeight(SW);
	bezier(x1, y1, x2, y2, x3, y3, x4, y4);

	//animation
	let percent = ((frameCount % (totalFrames)) / (totalFrames));
	percent = easeInOutQuad(percent) * 4;

	switch (version) {
		case 'a':
			versionA(percent);
			break;
		case 'b':
			versionB(percent);
			break;
		case 'c':
			versionC(percent);
			break;
		case 'd':
			versionD(percent);
			break;
	}

	// render txt
	txtDraw();

	saveDraw();
}

//———————————————————————————————————— versions
function versionA(percent) {
	if (percent <= 1) {
		y2 = map(percent, 0, 1, height, height / 2);

		y4 = map(percent, 0, 1, 0, height);
	} else if (percent <= 2) {
		y2 = map(percent, 1, 2, height / 2, 0);

		y4 = height;
		x4 = map(percent, 1, 2, width, 0);
	} else if (percent <= 3) {
		y2 = map(percent, 2, 3, 0, height / 2);

		x4 = 0;
		y4 = map(percent, 2, 3, height, 0);
	} else if (percent <= 4) {
		y2 = map(percent, 3, 4, height / 2, height);

		y4 = 0;
		x4 = map(percent, 3, 4, 0, width);
	}
}

function versionB(percent) {
	if (percent <= 1) {
		y3 = map(percent, 0, 1, 0, height / 2);

		y4 = map(percent, 0, 1, 0, height);
	} else if (percent <= 2) {
		y3 = map(percent, 1, 2, height / 2, 0);

		y4 = height;
		x4 = map(percent, 1, 2, width, 0);
	} else if (percent <= 3) {
		y3 = map(percent, 2, 3, 0, height / 2);

		x4 = 0;
		y4 = map(percent, 2, 3, height, 0);
	} else if (percent <= 4) {
		y3 = map(percent, 3, 4, height / 2, 0);

		y4 = 0;
		x4 = map(percent, 3, 4, 0, width);
	}
}

function versionC(percent) {
	if (percent <= 1) {
		y2 = map(percent, 0, 1, 0, height);

		y4 = map(percent, 0, 1, 0, height);
	} else if (percent <= 2) {
		y4 = height;
		x4 = map(percent, 1, 2, width, 0);
	} else if (percent <= 3) {
		y2 = map(percent, 2, 3, height, height / 2);

		x4 = 0;
		y4 = map(percent, 2, 3, height, 0);
	} else if (percent <= 4) {
		y2 = map(percent, 3, 4, height / 2, 0);

		y4 = 0;
		x4 = map(percent, 3, 4, 0, width);
	}
}

function versionD(percent) {
	if (percent <= 1) {
		x2 = map(percent, 0, 1, 0, width / 3 * 2);

		y4 = map(percent, 0, 1, 0, height);
	} else if (percent <= 2) {
		x2 = map(percent, 1, 2, width / 3 * 2, width);

		y4 = height;
		x4 = map(percent, 1, 2, width, 0);
	} else if (percent <= 3) {
		x2 = map(percent, 2, 3, width, width / 3 * 2);

		x4 = 0;
		y4 = map(percent, 2, 3, height, 0);
	} else if (percent <= 4) {
		x2 = map(percent, 3, 4, width / 3 * 2, 0);

		y4 = 0;
		x4 = map(percent, 3, 4, 0, width);
	}
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

//———————————————————————————————————— easing
function easeInOutQuad(t) {
	return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function easeOutQuad(t) {
	return t * (2 - t)
}