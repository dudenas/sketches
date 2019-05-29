// style
let scl = 25
let txtSize = 10
let clrs = [250, 5, 250, [235, 35, 50], 125]
let SW = 1.618
let lineLen = scl / 5 * 2

// font
let myFont
let logoImg

// skelet
let skelet = true

// padding
let xpadd
let ypadd

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
	createCanvas(350, 267)

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
	xpadd = (width - (cols * scl)) / 2
	ypadd = (height - (rows * scl)) / 2
	translate(xpadd, ypadd)
	grfcDraw()
	saveDraw()
}