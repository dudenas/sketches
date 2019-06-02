let imgs = []
let totalPhotos = 9

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
			fps = p.createP()
		}
	}

	//————————————————————————————————————————————————————————————————————————————————— Setup
	p.setup = function () {
		if (p.type === "SVG") {
			p.createCanvas(420, 594, p.SVG)
			p.pixelDensity(1)
		} else if (p.type === "NORMAL") {
			p.createCanvas(420, 594)
			p.pixelDensity(2)
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
		p.noLoop()
	}

	//————————————————————————————————————————————————————————————————————————————————— Draw
	p.draw = function () {
		if (p.type === "NORMAL") {
			p.background(clrs[0])
			// offset to align to the middle
			let x = (p.width - (cols * scl)) / 2
			let y = (p.height - (rows * scl)) / 2
			p.translate(x, y)

			grfcDraw()

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
		}
	}

	p.save_canvas = function () {
		p.clear()
		p.textFont(myFont)
		p.textAlign(p.CENTER, p.CENTER)
		p.textSize(txtSize)
		p.background(clrs[0])
		let x = (p.width - (cols * scl)) / 2
		let y = (p.height - (rows * scl)) / 2
		p.translate(x, y)

		cells.forEach((elm) => {
			p.push()
			p.translate(elm.pos.x + scl / 2, elm.pos.y + scl / 2)
			p.rotate(elm.angle)
			p.noStroke()
			p.fill(clrs[1])
			p.text(elm.letter, 0, 0)
			p.pop()
		})

		photos.forEach((elm) => {
			p.noStroke()
			p.fill(clrs[1])
			p.rectMode(p.CENTER)
			p.rect(elm.pos.x, elm.pos.y, elm.w, elm.h)
		})
		p.save();
	}
}

cvs = new p5(sketch, "my_image");
cvs.type = "NORMAL";

svg = new p5(sketch, "hidden_div");
svg.type = "SVG";