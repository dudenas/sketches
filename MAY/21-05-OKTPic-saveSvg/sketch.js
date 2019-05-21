let imgs = []
let img
let totalPhotos = 3

// style
let scl = 25
let txtSize = 10
let clrs = [250, 5, [255, 0, 85], 125]

// font
let myFont

// debug
let debug = true
let fps

let sketch = function (p) {
	//————————————————————————————————————————————————————————————————————————————————— Preload
	p.preload = function () {
		if (p.type === "NORMAL") {

			myFont = p.loadFont('assets/font/Silka-Bold.otf', () => {
				console.log('font loaded')
			})
			date = p.loadImage('assets/date.png', () => {
				console.log('date loaded')
			})
			logo = p.loadImage('assets/logo.png', () => {
				console.log('logo loaded')
			})

			img = p.loadImage('assets/photo/0.jpg', () => {
				console.log('photo loaded')
			})

			fps = p.createP()
		}
	}

	//————————————————————————————————————————————————————————————————————————————————— Setup
	p.setup = function () {
		if (p.type === "NORMAL") {
			p.createCanvas(540, 540)
			p.pixelDensity(2)
			p.noLoop()
		} else {
			alert("don't know which canvas to create")
		}
		// set the font
		if (p.type === "NORMAL") {
			p.textFont(myFont)
			p.textAlign(p.CENTER, p.CENTER)
			p.textSize(txtSize)
			grfcSetup(p)
		}
	}

	//————————————————————————————————————————————————————————————————————————————————— Draw
	p.draw = function () {
		if (p.type === "NORMAL") {
			p.background(clrs[0])
			// offset to align to the middle
			let x = (p.width - (cols * scl)) / 2
			let y = (p.height - (rows * scl)) / 2
			p.translate(x, y)

			grfcDraw(p)

			fps.html(p.floor(p.frameRate()))
		}
	}

	p.reset = function () {
		grfcSetup(p)
		p.redraw()
		console.log('reset')
	}

	//————————————————————————————————————————————————————————————————————————————————— KeyPressed
	p.keyPressed = function () {
		if (p.type === "NORMAL") {
			if (p.key == 'd' || p.key == 'D') {
				debug = !debug
				p.redraw()
			}
			if (p.key == 'r' || p.key == 'R') p.reset()
			if (p.key == 's' || p.key == 'S') p.save()
		}
	}

}

cvs = new p5(sketch, "my_image");
cvs.type = "NORMAL";

// svg = new p5(sketch, "hidden_div");
// svg.type = "SVG";