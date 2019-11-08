let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 120;

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(800, 600);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doubleExponentialSigmoid'];
	// quadraticInOut


	// setup style
	strokeCap(SQUARE);
	strokeJoin(SQUARE);

	// setup graphics
	grfcSetup();

	// setup save
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0]);

	// draw graphics
	grfcDraw();

	// save
	saveDraw();

	// totalFrames = map(sin(frameCount * TWO_PI), -1, 1, 120, 40);
}