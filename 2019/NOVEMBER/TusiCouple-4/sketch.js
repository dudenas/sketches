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

function draw() {
	background(clrs[0])


	let percent = ((frameCount) % (totalFrames)) / (totalFrames);
	// percent = ease[styles[0]](percent, 0.3); // 1
	// percent = ease[styles[0]](percent, 0.3); // 2
	percent = ease[styles[0]](percent, 0.6); // 3
	angle = map(percent, 0, 1, 0, TWO_PI)

	drawGraphics()

	// save
	saveDraw()
}

function drawGraphics() {
	// all graphics
	noFill();
	push()

	// main circle
	translate(width / 2, height / 2)
	stroke(clrs[1])
	strokeWeight(SW / 2)
	ellipse(0, 0, R, R)

	//  lines
	strokeWeight(SW / 2)
	for (let i = 0; i < total; i++) {
		const theta = map(i, 0, total, 0, PI)
		// console.log(theta)
		const x1 = (R / 2) * cos(theta)
		const y1 = (R / 2) * sin(theta)
		const x2 = (-R / 2) * cos(theta)
		const y2 = (-R / 2) * sin(theta)
		line(x1, y1, x2, y2)
	}

	// drawing circle
	for (let tp of tusiPoints) {
		push()
		tp.update()
		tp.show()
		pop()
	}
	// pop()
	pop()
}