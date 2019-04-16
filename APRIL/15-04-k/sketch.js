let clrs = [250, 5];
let SW = 2;
let padd = 50;
let len = 200;
let id = ["lt", "rt", "rb", "lb"];

let ease, styles;

function setup() {
	createCanvas(540, 540);
	setupGrfc();

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticIn', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceIn'];
	strokeCap(PROJECT);
	gridSetup();
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

function setupGrfc(index, cx, cy) {
	let klines = [];

	// lt
	let x1 = 0;
	let x2 = 0;

	let y1 = 0;
	let y2 = padd - height / 2;

	let kl = new kline(x1, x2, y1, y2, id[0], index, cx, cy);
	klines.push(kl);

	// lb
	x1 = 0;
	y1 = 0;
	x2 = 0;
	y2 = height - padd - height / 2;

	kl = new kline(x1, x2, y1, y2, id[3], index, cx, cy);
	klines.push(kl);

	// rt
	x1 = 0;
	y1 = 0;
	x2 = 0 + len;
	y2 = padd - height / 2;

	kl = new kline(x1, x2, y1, y2, id[1], index, cx, cy);
	klines.push(kl);

	// rb
	x1 = 0;
	y1 = 0;
	x2 = 0 + len;
	y2 = height - padd - height / 2;

	kl = new kline(x1, x2, y1, y2, id[2], index, cx, cy);
	klines.push(kl);
	return klines;
}