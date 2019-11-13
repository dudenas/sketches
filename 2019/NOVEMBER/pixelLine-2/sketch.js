const clrs = [250, 5]
const totalFrames = 210
const padd = 75
const words = "I am not going to fall".split(" ")
const eraseRects = []

let d
let nx = 0
let ease, styles
let prev = []


function setup() {
	createCanvas(540, 540)
	pixelDensity(2)
	noStroke()
	textAlign(CENTER, CENTER)
	textSize(24)
	d = pixelDensity()
	saveSetup()
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doubleExponentialSigmoid', 'quadraticInOut']

	// setup eraseRect
	for (let x = 0; x < width; x++) {
		eraseRects.push(new eraseRect(x))
	}
}

function draw() {
	background(clrs[0])
	fill(clrs[1])
	for (let i = 0; i < words.length; i++) {
		drawText(words[i], width / (words.length + 1) * (i + 1), i * 25)
		// console.log(words.length)
	}
	// drawText(words[1], width / 6 * 2, -75)
	// drawText(words[2], width / 6 * 3, 0)
	// drawText(words[3], width / 6 * 4, 75)
	// drawText(words[4], width / 6 * 5, 150)
	let curr = []
	loadPixels();
	for (let x = 0; x < width; x++) {
		let i = 4 * (x * d + height / 2 * d * width * d)
		curr.push(pixels[i + 1])
	}
	fill(clrs[0])
	rect(0, height / 2, width, height / 2)
	for (let x = 0; x < width; x++) {
		eraseRects[x].update(curr[x])
		eraseRects[x].show()
	}
	percent = frameCount % totalFrames / totalFrames
	percent = ease[styles[0]](percent, 0.2);
	// percent = ease[styles[1]](percent, 0.2);
	nx = map(percent, 0, 1, 0, height);
	prev = curr.slice();
	saveDraw()
}

function drawText(txt, x, padd) {
	text(txt, x, (nx + height / 6 * 6 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 5 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 4 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 3 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 2 + padd) % height - 100)
	text(txt, x, (nx + height / 6 * 1 + padd) % height - 100)
}

class eraseRect {
	constructor(x) {
		this.x = x
		this.len = 0
	}
	update(addLen) {
		addLen = map(addLen, 5, 250, height / 2, 0)
		this.len = lerp(this.len, addLen, 0.2)
	}

	show() {
		fill(clrs[1])
		rect(this.x, height / 2, 1, this.len)
	}
}