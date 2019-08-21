const clrs = [250, 5, '#E51717']

let myFont;

// text used
let words = 'not yet dead'.split(' ')
let word
let current = 0
let px, py, pxb, pyb, pxc, pyc;
let r = 180;
let theta = 0;
let percent = 0;
let dir = 1;

// ANIMATION
let ease;

function preload() {
	// load font
	myFont = loadFont('assets/Faktum-Bold.otf', () => console.log('font is loaded'))
}

function setup() {
	createCanvas(540, 540);
	// SAVE
	saveSetup()
	// text style
	textFont(myFont)
	textAlign(CENTER, CENTER)
	rectMode(CENTER)
	textSize(48)
	// pick a word
	word = words[current]
	// ANIMATION
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doubleExponentialSigmoid', 'doublePolynomialSigmoid'];
}

function draw() {
	// background(clrs[0])

	// ANIMATION
	percent = (frameCount % totalFrames) / totalFrames
	percent = ease[styles[0]](percent, floor(this.speed * 10));
	theta = map(percent, 0, 1, 0, TWO_PI * dir);
	if (frameCount % totalFrames == 0) dir *= -1
	px = width / 2 + r * cos(theta)
	py = height / 2 + r * sin(theta)
	pxb = width / 2 + r * cos(theta + TWO_PI / 3)
	pyb = height / 2 + r * sin(theta + TWO_PI / 3)
	pxc = width / 2 + r * cos(theta + 2 * TWO_PI / 3)
	pyc = height / 2 + r * sin(theta + 2 * TWO_PI / 3)
	r = map(sin(percent * TWO_PI), -1, 1, 185, 185 / 2)

	// DRAW
	drawTxt(px, py, words[current])
	drawTxt(pxb, pyb, words[(current + 1) % words.length])
	drawTxt(pxc, pyc, words[(current + 2) % words.length])

	// SAVE
	saveDraw()
}

function drawTxt(x, y, w) {
	noStroke()
	fill(clrs[0])
	rect(x, y, textWidth(w), textAscent())
	fill(clrs[1])
	text(w, x, y)
}

function keyPressed() {
	if (key == 'a' || key == 'A') {
		current = (current + 1) % words.length
		word = words[current]
	}
}