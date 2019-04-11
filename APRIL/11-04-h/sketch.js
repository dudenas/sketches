let clrs = [5, 250];
let SW = 3;
let totalFrames = 300;

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	grfcSetup();
	strokeCap(SQUARE);
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);
	leftX = 0;
	rightX = width;
	grfcUpdate();
	grfcDraw();
	saveDraw();
}