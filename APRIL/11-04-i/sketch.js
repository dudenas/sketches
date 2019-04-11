let clrs = [5, 250];
let SW = 2;
let cols, rows;
let scl = 45;
let totalFrames = 200;
let cells = [];
let icells = [];
let r = 200;
let obj;

let ease, styles;

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540, WEBGL);
	obj = createVector();

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf'];

	cols = floor(width / scl);
	rows = floor(height / scl);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (!(i > cols / 2 - 2 && i < cols / 2 + 1 &&
					(j > 2 && j < rows - 2))) {
				let c = new Cell(i * scl, j * scl, false);
				cells.push(c);
			} else {
				let c = new Cell(i * scl, j * scl, true);
				icells.push(c);
			}

		}
	}
	createTexture();
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);
	fill(clrs[0]);
	push();
	translate(0, 0, -scl / 2 + 1);
	box(width, height, scl);
	pop();
	push();
	translate(-width / 2 + scl / 2, -height / 2 + scl / 2);
	for (let c of cells) {
		c.update();
		c.show();
	}
	for (let c of icells) {
		c.update_i();
		c.show();
	}
	pop();
	// translate(0, 0, 1);
	// fill(clrs[1]);
	// let s = scl * 0.7;
	// rect(-s / 2, -s * 3, s, s * 8);

	let percent = (frameCount % totalFrames) / totalFrames;
	obj.x = width / 2 + r * cos(map(percent, 0, 1, 0, TWO_PI));
	obj.y = height / 2 + r * sin(map(percent, 0, 1, 0, TWO_PI));
	saveDraw();
}