let clrs = [5, 250];
let xlen = 50;
let ylen = 25;
let SW = 4;
let x1, x2, y1, y2, x, y;
let time = 1;

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	strokeCap(SQUARE);
	strokeJoin(BEVEL);
	setValues();
	grfcSetup();
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);
	for (let g of grfc) {
		g.update();
		g.show();
	}

	let percent = ((frameCount / 4) % totalFrames) / totalFrames;
	time = map(sin(percent * TWO_PI), -1, 1, 1, 9);
	saveDraw();
}

//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function setValues() {
	x = width / 2;
	y = height / 2;
	x1 = -xlen;
	x2 = xlen;
	y1 = ylen;
	y2 = -ylen;
}