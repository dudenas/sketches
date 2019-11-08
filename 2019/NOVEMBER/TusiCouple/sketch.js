const clrs = [0, 255]
const SW = 6
const R = 335
const totalFrames = 60;
const changeTime = 30;

let tusiPoints;
let total = 1
let angle = 0
let back = false
let stop = false
let ease, styles


function setup() {
	createCanvas(540, 540)
	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doubleExponentialSigmoid']

	// setup save
	saveSetup();

	createTusiPoints()
}

function draw() {
	background(clrs[0])


	let percent = ((frameCount) % (totalFrames)) / (totalFrames);
	percent = ease[styles[0]](percent, 0.3);
	angle = map(percent, 0, 1, 0, TWO_PI)

	if (frameCount % (totalFrames * 4) == changeTime && frameCount > changeTime) back = !back
	if (frameCount % changeTime == 0) {
		if (!back) total++
		else total--
		createTusiPoints()
	}

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
	// ellipse(0, 0, R, R)

	//  lines
	strokeWeight(SW / 2)
	for (let i = 0; i < total; i++) {
		const theta = map(i, 0, total, 0, PI)
		// console.log(theta)
		const x1 = (R / 2) * cos(theta)
		const y1 = (R / 2) * sin(theta)
		const x2 = (-R / 2) * cos(theta)
		const y2 = (-R / 2) * sin(theta)
		// line(x1, y1, x2, y2)
	}

	// smaller circle
	push()
	rotate(angle)
	translate(R / 4, 0)
	strokeWeight(SW / 2)
	// ellipse(0, 0, R / 2, R / 2)

	// point
	strokeWeight(SW * 4)
	// point(0, 0)

	// drawing circle
	rotate(-2 * angle)
	for (let tp of tusiPoints) {
		tp.update();
		tp.show();
	}
	pop()
	pop()
}