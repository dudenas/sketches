let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 90;

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['smoothStep'];

	// setup style
	strokeCap(SQUARE);
	strokeJoin(BEVEL);

	// setup graphics
	grfcSetup();

	// setup save
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0]);

	translate((-scl / 2 + padd) / 2,(-scl / 2 + padd) / 3)
	// draw graphics
	grfcDraw();

	// save
	saveDraw();

	// totalFrames = map(sin(frameCount * TWO_PI), -1, 1, 120, 40);
}