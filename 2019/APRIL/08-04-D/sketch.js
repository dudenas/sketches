let clrs = [250, 5];
let SW = 2;
let len = 50;

let grfc = [];
let obj;
let r = 200;
let angle = 0;
let totalFrames = 200;

let styles;
let ease;
function setup() {
	createCanvas(540, 540);

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['normalizedLogitSigmoid'];

	let padd = 50;

	let g3a = new Grfc(width / 2 - width / 2 - padd);
	let g3 = new Grfc(width / 2 - width / 4 - padd);
	let g1 = new Grfc(width / 2 - padd);
	let g2 = new Grfc(width / 2 + width / 4 - padd);
	let g2b = new Grfc(width / 2 + width / 2 - padd);

	grfc.push(g1);
	grfc.push(g2);
	grfc.push(g2b);
	grfc.push(g3);
	grfc.push(g3a);
	obj = createVector(0, 0);

	saveSetup();
}

function draw() {
	background(clrs[0]);

	len = map(obj.y, 0, height, 50, 200);

	for (g of grfc) {
		g.show();
		g.update();
	}

	objDraw();
	let percent = (frameCount % totalFrames) / totalFrames;
	percent = ease[styles[0]](percent);
	angle = map(percent, 0, 1, 0, TWO_PI);

	saveDraw();
}

function objDraw() {
	obj.x = width / 2 + r * cos(angle);
	obj.y = height / 2 + r * sin(angle);
	//ellipse(obj.x, obj.y, 24, 24);
}