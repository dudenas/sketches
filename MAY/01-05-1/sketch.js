let clrs = [250, 5, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 90;

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut'];

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

	let temp = letters[letters.length - 1].x;
	let stable = letters[letters.length - 1].xo;
	let x = (width - ((cols - 1) * spacing)) / 2 + (stable - temp) / 2;
	translate(x, 0);
	// draw graphics
	grfcDraw();

	// save
	saveDraw();
}