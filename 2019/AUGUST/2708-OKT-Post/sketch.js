const clrs = [250, 5, '#E51717']

let myFont;

// text used
let word = 'OKT generator'
let current = 0

// ANIMATION
let ease;
let txtSize = 2;

function preload() {
	// load font
	myFont = loadFont('assets/Faktum-Bold.otf', () => console.log('font is loaded'))
}

function setup() {
	createCanvas(540, 540)
	// SAVE
	saveSetup()
	// text style
	textFont(myFont)
	textAlign(CENTER, CENTER)
	rectMode(CENTER)
	textSize(48)
	// ANIMATION
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['doubleExponentialSigmoid', 'doublePolynomialSigmoid'];
}

function draw() {
	background(clrs[0])
	stroke(clrs[2])
	noFill()
	line(0, height / 2 - copyLines, width, height / 2 - copyLines)
	line(0, height / 2 + copyLines, width, height / 2 + copyLines)
	noStroke()
	fill(clrs[1])
	text(word, width / 2, yVal)
	// SAVE
	saveDraw()
}