// Style
const clrs = [250, 5, '#E51717']
let myFont;

// text used
let word = 'OKT generator'

// PGraphics
let pg

function preload() {
	// load font
	myFont = loadFont('assets/Faktum-Bold.otf', () => console.log('font is loaded'))
}

function setup() {
	createCanvas(1080, 1080).id('myCanvas')
	pixelDensity(1)
	// text style
	textFont(myFont)
	// textAlign(CENTER, CENTER)
	textAlign(CENTER, TOP);
	textSize(txtSize)

	pg = createGraphics(width, height);
	pg.textSize(txtSize)
	pg.textFont(myFont)
	pg.textAlign(CENTER, TOP);
}

function draw() {
	background(clrs[0])
	const pushLine = txtSize / 5 * 3 + yMaster + yLines
	drawPG(pushLine)
	stroke(clrs[2])
	noFill()
	line(0, pushLine - copyLines, width, pushLine - copyLines)
	line(0, pushLine + copyLines, width, pushLine + copyLines)
	noStroke()
	fill(clrs[1])
	text(word, width / 2, yMaster)
	const temp = createImage(width, copyLines * 2)
	temp.copy(this, 0, pushLine - copyLines, width, copyLines * 2, 0, 0, width, temp.height)
	image(temp, 0, height / 2);
}

function drawPG() {}