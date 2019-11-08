const clrs = [250, 5]
const SW = 1
const R = 100
const totalFrames = 90
const showLines = false

let angle = 0
let ease, styles


function setup() {
	createCanvas(540, 540)
	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doubleExponentialSigmoid']

	// setup save
	saveSetup()

	createTusiFrames()
}

function draw() {
	background(clrs[0])

	let percent = ((frameCount) % (totalFrames)) / (totalFrames);
	percent = ease[styles[0]](percent, -1);
	angle = map(percent, 0, 1, 0, TWO_PI)

	drawGraphics()

	// save
	saveDraw()
}

function drawGraphics() {
	translate(R / 3 * 2, R / 3 * 2)
	for (tp in tusiFrames) {
		tusiFrames[tp].show()
	}
}