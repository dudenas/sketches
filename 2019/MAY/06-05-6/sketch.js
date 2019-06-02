let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 90;

function setup() {
	createCanvas(540, 540);
	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backInOut', 'bounceInOut'];

	// setup style
	strokeCap(SQUARE);
	strokeJoin(BEVEL);

	// grfcSetup
	grfcSetup();

	// setup save
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	// draw Background
	background(clrs[0]);
	// grfcUpdate
	grfcUpdate();

	// save
	saveDraw();
}
