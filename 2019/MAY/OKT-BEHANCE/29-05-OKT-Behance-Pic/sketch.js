let imgs = []
let img
let totalPhotos = 3

// style
let scl = 25
let txtSize = 10
let clrs = [250, 5, [235, 35, 50], 125]
let SW = 1.618
let lineLen = scl / 5 * 2

// font
let myFont

// skelet
let skelet = true

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
	createCanvas(400, 800) // 350 267
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
	if (key == 'd' || key == 'D') {
		skelet = !skelet
		console.log(skelet)
		redraw();
	}
	if (key == 'r' || key == 'R') reset()
	if (key == 't' || key == 'T') {
		imgIndex = (imgIndex + 1) % 19
		reset()
	}
	if (key == 's' || key == 'S') save(`${imgIndex}.png`)
}