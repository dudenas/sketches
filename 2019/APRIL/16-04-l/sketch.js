let clrs = [250, 5];
let xlen = 75;
let ylen = 150;
let SW = 10;
let x1;
let x2;
let y1;
let y2;

let ease, styles;

function setup() {
	createCanvas(540, 540);
	strokeCap(PROJECT);
	redefineValues();
	gridSetup();
	frameRate(30);

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticIn', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceIn'];

	saveSetup();
}

function draw() {
	background(clrs[0]);
	for (let g of grfc) {
		g.update();
		g.show();
	}

	saveDraw();
}

function redefineValues() {
	xlen /= scl;
	ylen /= scl;
	x1 = -xlen;
	x2 = xlen;
	y1 = ylen;
	y2 = -ylen;
}