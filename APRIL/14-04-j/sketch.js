let clrs = [250, 5];

let cols, rows;
let scl = 540 / 6;
let SW = 12;
let rSize = SW * 2;

let grfc = [];

let ease, styles;

function setup() {
	createCanvas(540, 540);
	background(clrs[0]);
	saveSetup();

	cols = floor(width / scl);
	rows = floor(height / scl);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			stroke(clrs[1]);
			let x = i * scl;
			let y = j * scl;

			grfc.push(new Grfc(x, y));
		}
	}

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf'];

	strokeCap(PROJECT);
}

function draw() {
	background(clrs[0]);
	for (let g of grfc) {
		g.update();
		g.show();
	}
	saveDraw();
}