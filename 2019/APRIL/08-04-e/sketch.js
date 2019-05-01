let clrs = [250, 5];
let SW = 2;
let padd;
let y, x;
let lines = [];
let lineNum = 12;
let obj;
let totalFrames = 400;


let ease, styles;

function setup() {
	createCanvas(540, 540);
	saveSetup();
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf'];

	padd = width / 6;

	let l1 = new eLine(padd, height / 2);
	let l2 = new eLine(padd, height / 2 + padd);
	let l3 = new eLine(padd, height / 2 + padd * 2);
	lines.push(l1);
	lines.push(l2);
	lines.push(l3);

	obj = createVector(0, 0);
}

function draw() {
	background(clrs[0]);
	// line(0,height/2, width, height/2);
	y = map(obj.y, 0, width, 0, 1);
	x = map(obj.x, 0, height, 0, 1);

	translate(0, -padd / 3);
	for (let l of lines) {
		l.update();
		l.show();
	}

	let percent = (frameCount % totalFrames) / totalFrames;
	let percent1 = ease[styles[2]](percent);
	let percent2 = ease[styles[1]](percent);
	obj.y = map(sin(percent1 * TWO_PI), -1, 1, 0, height);
	obj.x = map(sin(percent2 * TWO_PI), -1, 1, 0, width);
	saveDraw();
}