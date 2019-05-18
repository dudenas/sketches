let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 120;

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doubleExponentialSigmoid'];
	// quadraticInOut
	

	// setup style
	strokeCap(ROUND);
	strokeJoin(ROUND);

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