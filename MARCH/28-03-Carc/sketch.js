let clrs = [5, 250];
let SW = 24;
let r;
let ratio = 1.414;
let startAngle = -Math.PI / 6;
let endAngle = Math.PI + Math.PI / 6;
let arcs = [];
let totalFrames = 200;

let ease;
let styles;

function setup() {
	createCanvas(540, 540);
	pixelDensity(2);
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doublePolynomialSigmoid']; // ['doubleExponentialSigmoid', 

	// r = width / 3 * 2;
	r = 150;
	setupSystem(r, SW, 0);
	setupSystem(r, SW, 1);
	setupSystem(r, SW, 2);
	setupSystem(r, SW, 3);
}

function draw() {
	background(clrs[0]);

	stroke(clrs[1]);
	noFill();

	for (let a of arcs) {
		if (a.index == 0) a.render(-width / 4, -height / 4);
		if (a.index == 1) a.render(width / 4, -height / 4);
		if (a.index == 2) a.render(width / 4, height / 4);
		if (a.index == 3) a.render(-width / 4, height / 4);
	}
}

function setupSystem(r, sw, index) {
	sw = constrain(sw, 1, SW);
	let a = new ArcObj(r, sw, index);
	arcs.push(a);
	if (r > 25) {
		return setupSystem(r / ratio, sw / ratio, index);
	}
}