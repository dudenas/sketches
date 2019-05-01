let clrs = [250, 5, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 150;
let img;
let nextFrame = 0;

//————————————————————————————————————————————————————————————————————————————————— Preload
// function preload() {
// 	img = loadImage("files/img.png", () => {
// 		console.log('img is loaded');
// 	});
// }

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540);

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut'];

	// setup style
	strokeCap(PROJECT);
	strokeJoin(BEVEL);

	// setup graphics
	grfcSetup();

	// setup save
	saveSetup();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0]);
	// image(img, 0, 0);

	// img.loadPixels();
	let x = (width - ((cols - 1) * spacing)) / 2
	translate(x, 0);
	// draw graphics
	grfcDraw();

	// save
	saveDraw();
}