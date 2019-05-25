// style
let scl = 25
let txtSize = 10
let clrs = [250, 5, 250, [255, 0, 85], 125]

// font
let myFont
let logoImg

function preload() {
	myFont = loadFont('assets/font/Silka-Bold.otf', () => {
		console.log('font loaded')
	})
	logoImg = loadImage('assets/logo.png', () => {
		console.log('logo loaded')
	})
}

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(700, 432)

	// set the font
	textFont(myFont)
	textAlign(CENTER, CENTER)
	textSize(txtSize)

	// set the graphics
	grfcSetup()

	saveSetup()
	// noLoop()
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0])
	// offset to align to the middle
	let x = (width - (cols * scl)) / 2
	let y = (height - (rows * scl)) / 2
	translate(x, y)
	grfcDraw()
	saveDraw()
}