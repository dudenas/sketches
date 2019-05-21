let imgs = []
let img
let totalPhotos = 3

// style
let scl = 25
let txtSize = 10
let clrs = [250, 5, 250, [255, 0, 85], 125]

// font
let myFont

// debug
let debug = false

let imgIndex = 0
let canvas


//————————————————————————————————————————————————————————————————————————————————— Preload
preload = function () {
	myFont = loadFont('assets/font/Silka-Bold.otf', () => {
		console.log('font loaded')
	})
	date = loadImage('assets/date.png', () => {
		console.log('date loaded')
	})
	logo = loadImage('assets/logo.png', () => {
		console.log('logo loaded')
	})

	for (let i = 0; i < 19; i++) {
		let img = loadImage('assets/photo/' + (i + 1) + '.jpg', () => console.log(`photo loaded — ${i + 1}`))
		imgs[i] = img
	}
}

//————————————————————————————————————————————————————————————————————————————————— Setup
setup = function () {
	createCanvas(475, 600)
	pixelDensity(2)
	noLoop()
	// set the font
	textFont(myFont)
	textAlign(CENTER, CENTER)
	textSize(txtSize)
	grfcSetup()
}

//————————————————————————————————————————————————————————————————————————————————— Draw
draw = function () {
	img = imgs[imgIndex]
	background(clrs[0])
	// offset to align to the middle
	let x = (width - (cols * scl)) / 2
	let y = (height - (rows * scl)) / 2
	translate(x, y)

	grfcDraw()
}

function reset() {
	grfcSetup()
	redraw()
	console.log(imgIndex)
	console.log('reset')
}

//————————————————————————————————————————————————————————————————————————————————— KeyPressed
function keyPressed() {
	// if (key == 'd' || key == 'D') {
	// 	debug = !debug
	// 	redraw()
	// }
	if (key == 'r' || key == 'R') reset()
	if (key == 't' || key == 'T') {
		reset()
		imgIndex = (imgIndex + 1) % 19
	}
	if (key == 's' || key == 'S') save(`${imgIndex}.png`)
}