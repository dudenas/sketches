let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 200;

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut'];

	// setup Graphics
	grfcSetup();

	// setup style
	strokeCap(SQUARE);
	strokeJoin(BEVEL);

	// save
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0]);
	grfcDraw();

	saveDraw();
}