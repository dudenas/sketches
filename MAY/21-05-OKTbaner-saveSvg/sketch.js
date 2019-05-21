let imgs = []
let totalPhotos = 5

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

			fps = p.createP()
		}
	}

	//————————————————————————————————————————————————————————————————————————————————— Setup
	p.setup = function () {
		if (p.type === "SVG") {
			p.createCanvas(960, 415, p.SVG)
			p.pixelDensity(1)
			p.noLoop()
		} else if (p.type === "NORMAL") {
			p.createCanvas(960, 415)
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
		}
	}

	p.save_canvas = function () {
		p.scale(1 / 2)
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
			p.fill(clrs[2])
			if (elm.logoShow) {
        p.fill(clrs[1])
      }
			p.rectMode(p.CENTER)
			p.rect(elm.pos.x, elm.pos.y, elm.w, elm.h)
		})

		onTop.forEach((elm) => {
			p.push()
			p.translate(elm.pos.x + scl / 2, elm.pos.y + scl / 2)
			p.rotate(elm.angle)
			p.noStroke()
			p.fill(clrs[1])
			p.text(elm.letter, 0, 0)
			p.pop()
		})

		p.noStroke()
		p.fill(clrs[2])
		p.rect(p.floor(cols / 2) * scl, p.floor(rows / 2) * scl, dateW * scl, dateH * scl)

		p.save()
		document.location.reload()
	}
}

cvs = new p5(sketch, "my_image");
cvs.type = "NORMAL";

svg = new p5(sketch, "hidden_div");
svg.type = "SVG";