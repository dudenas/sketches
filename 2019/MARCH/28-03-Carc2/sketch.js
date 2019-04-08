let clrs = [5, 250];
let SW = 12;
let ratio = 1.414;
let startAngle = -Math.PI / 6;
let endAngle = Math.PI + Math.PI / 6;
let arcs = [];
let totalFrames = 150;

let ease;
let styles;

function setup() {
	createCanvas(540, 540);
	saveSetup();
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doublePolynomialSigmoid']; // ['doubleExponentialSigmoid', 

	let r = width / 3;
	let rmin = width / 10;
	setupSystem(r, rmin, SW, 0);
	setupSystem(r * 5 / 2, r, SW, 1);
}

function draw() {
	background(clrs[0]);

	stroke(clrs[1]);
	noFill();

	for (let a of arcs) {
		a.render()
	}

	saveDraw();
}

function setupSystem(r, rmin, sw, index) {
	sw = constrain(sw, 1, SW);
	let a = new ArcObj(r, sw, index);
	arcs.push(a);
	if (r > rmin) {
		return setupSystem(r / ratio, rmin, sw / ratio, index);
	}
}