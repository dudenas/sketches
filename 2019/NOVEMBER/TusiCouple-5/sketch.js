const clrs = [250, 5]
const SW = 1
const R = 335
const totalFrames = 120;

let tusiPoints;
let total = 12
let angle = 0
let ease, styles

function setup() {
	createCanvas(540, 540)

	// setup save
	saveSetup();

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doubleExponentialSigmoid']

	// create tusi Points
	createTusiPoints()
}

let theta = 0
let r = 100

function draw() {
	background(clrs[0])


	let percent = ((frameCount) % (totalFrames)) / (totalFrames);
	// percent = ease[styles[0]](percent, 0.3); // 1
	// percent = ease[styles[0]](percent, 0.3); // 2
	percent = ease[styles[0]](percent, 0.6); // 3
	angle = map(percent, 0, 1, 0, TWO_PI)

	push()
	drawGraphics()
	pop()
	// save
	saveDraw()
}

function drawGraphics() {
	// all graphics
	noFill();

	// main circle
	translate(width / 2, height / 2)
	stroke(clrs[1])
	strokeWeight(SW / 2)
	ellipse(0, 0, R, R)

	// drawing circle
	for (let tp of tusiPoints) {
		tp.update()
		tp.show()
	}
}