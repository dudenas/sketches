// Style
const clrs = [255, 0, '#E51717']
let myFont;

// text used
let word = 'murama'

// PGraphics
let pg

// top padding
let topPadding = 0.8;

// save
let saveIt = false;
let pushLine = 0;

function preload() {
	// load font
	myFont = loadFont('assets/Faktum-Bold.otf', () => console.log('font is loaded'))
}

function setup() {
	createCanvas(1200, 1200).id('myCanvas')
	pixelDensity(1)
	// text style
	textFont(myFont)
	// textAlign(CENTER, CENTER)
	textAlign(CENTER, TOP);
	textSize(txtSize)

	pg = createGraphics(width, height);
	pg.textFont(myFont)
	pg.textAlign(CENTER, TOP);
	pg.textSize(txtSize)
	noLoop()
}

function draw() {
	background(clrs[0])
	pushLine = txtSize / 5 * 3 + yMaster + yLines

	// pg for copy
	pg.background(clrs[0])
	pg.noStroke()
	pg.fill(clrs[1])
	pg.text(word, width / 2, yMaster)

	drawLines()
	// on top graphics
	noStroke()
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
function drawLines() {
	const temp = createImage(width, int(copyLines * 2))
	temp.copy(pg, 0, pushLine - copyLines, width, copyLines * 2, 0, 0, width, temp.height)
	const y = txtSize * 5 / 4 * topPadding
	image(temp, 0, y);
	repeatImage(y, 1)
}

// REPEAT
function repeatImage(y, curr) {
	const temp = createImage(width, int(copyLines * 2))
	temp.copy(pg,
		0,
		pushLine - copyLines
		// where the fun begins
		+
		(curr * 2) % (txtSize * 5 / 4 * topPadding - pushLine + copyLines),
		width,
		copyLines * 2,
		0, 0, width, temp.height)
	image(temp, 0, y + yCopyLine * curr * gap);
	curr++
	if (y + yCopyLine * curr * gap < height) repeatImage(y, curr)
}