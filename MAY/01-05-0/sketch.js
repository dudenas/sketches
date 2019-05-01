let clrs = [5, 250, [255, 0, 85], 125];
let ease, styles;
let totalFrames = 150;
let video, loaded = false;
let nextFrame = 0;

//————————————————————————————————————————————————————————————————————————————————— Preload
function preload() {
	video = createVideo("files/pulpFiction.mp4", () => {
		console.log('video is loaded');
		loaded = true;

	});
}

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

	video.hide();
	video.loop();
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	// if (loaded) {
		background(clrs[0]);
		// image(video, 0, 0);

		video.loadPixels();
		// draw graphics
		grfcDraw();

		// save
		saveDraw();
	// }
}