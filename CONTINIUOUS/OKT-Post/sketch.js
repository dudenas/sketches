// Style
const clrs = [255, 0, '#E51717']
let myFont;

// text used
let word = 'OKT generator'

// PGraphics
let pg

// top padding
let topPadding = 0.8;

// save
let saveIt = false;

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
}

function draw() {
	background(clrs[0])
	const pushLine = txtSize / 5 * 3 + yMaster + yLines
	noStroke()

	// draw copy ones
	fill(clrs[1])
	text(word, width / 2, yMaster)
	drawLines(pushLine)
	// on top graphics
	fill(clrs[0])
	rect(0, 0, width, txtSize * 5 / 4 * topPadding)
	fill(clrs[1])
	text(word, width / 2, yMaster)

	// stroke
	if (!saveIt) {
		stroke(clrs[2])
		noFill()
		line(0, pushLine - copyLines, width, pushLine - copyLines)
		line(0, pushLine + copyLines, width, pushLine + copyLines)
	} else {
		saveIt = false;
		save(`OKT-${word}.png`)
	}
}

// DRAW
function drawLines(pushLine) {
	const temp = createImage(width, int(copyLines * 2))
	temp.copy(this, 0, pushLine - copyLines, width, copyLines * 2, 0, 0, width, temp.height)
	const y = txtSize * 5 / 4 * topPadding
	image(temp, 0, y);
	repeatImage(temp, y, 1)
}

// REPEAT
function repeatImage(temp, y, curr) {
	image(temp, 0, y + yCopyLine * curr * gap);
	curr++
	if (curr < times) repeatImage(temp, y, curr)
}