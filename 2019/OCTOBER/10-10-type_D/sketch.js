let clrs = [250, 5];
let SW = 1;
let len;

let grfc = [];
let obj;
let r = 150;
let angle = 0;
let totalFrames = 100;

let styles;
let ease;

function setup() {
	createCanvas(800, 600);

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['normalizedLogitSigmoid'];
	// styles = ['doublePolynomialSigmoid'];

	let padd = 50;

	let g3a = new Grfc(width / 2 - width / 2 - padd, undefined, 25);
	let g3 = new Grfc(width / 2 - width / 4 - padd, undefined, 25);
	let g1 = new Grfc(width / 2 - padd, undefined, 25);
	let g2 = new Grfc(width / 2 + width / 4 - padd, undefined, 25);
	let g2b = new Grfc(width / 2 + width / 2 - padd, undefined, 25);

	grfc.push(g1);
	grfc.push(g2);
	grfc.push(g2b);
	grfc.push(g3);
	grfc.push(g3a);
	obj = createVector(0, 0);

	saveSetup();
}

function draw() {
	let percent = (frameCount % totalFrames) / totalFrames;
	percent = ease[styles[0]](percent);
	background(clrs[0]);

	len = map(obj.y, 0, height, 200, 100);

	for (g of grfc) {
		const index = abs((g.opadd / 25) * 2);
		g.padd = map(sin(percent * TWO_PI), -1, 1, g.opadd, g.opadd * (index / 25));
		g.x = map(cos(percent * TWO_PI), -1, 1, g.xo, g.xo * pow(index, 0.15));
		g.show();
		g.update();
	}

	objDraw();
	angle = map(percent, 0, 1, 0, TWO_PI);

	saveDraw();
}

function objDraw() {
	obj.x = width / 4 + r * cos(angle);
	obj.y = height / 2 + r * sin(angle);
	// ellipse(obj.x, obj.y, 24, 24);
}