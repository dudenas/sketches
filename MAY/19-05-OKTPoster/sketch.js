let imgs = []
let totalPhotos = 10

// style
let scl = 25
let txtSize = 10
let clrs = [250, 5, [255, 0, 85], 125]

// font
let myFont

// debug
let debug = true
let fps
let imgMode = false

//————————————————————————————————————————————————————————————————————————————————— Preload
function preload() {
	myFont = loadFont('assets/font/Silka-Bold.otf', () => {
		console.log('font loaded')
	})

	if(imgMode)
	{
		for (let i = 0; i < totalPhotos; i++) {
			let img = loadImage('assets/photo/' + i + '.jpg', () => console.log(`photo loaded — ${i}`))
			imgs[i] = img
		}
	}

	fps = createP()
	noLoop()
}

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(420, 594, SVG)
	pixelDensity(1)
	scale(1)
	// set the font
	textFont(myFont)
	textAlign(CENTER, CENTER)
	textSize(txtSize)
	// resize images
	if(imgMode)
	{
		imgs.forEach(elm => {
			elm.resize(0, height)
		})
	}
	grfcSetup()
	noLoop()
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	this.clear()
	background(clrs[0])
	// offset to align to the middle
	let x = (width - (cols * scl)) / 2
	let y = (height - (rows * scl)) / 2
	translate(x, y)


	grfcDraw()

	fps.html(floor(frameRate()))
}

//————————————————————————————————————————————————————————————————————————————————— KeyPressed
function keyPressed() {
	if (key == 'd' || key == 'D') {
		debug = !debug
		redraw()
	}
	if (key == 'S') save()
	if (key == 'R') redraw()
}