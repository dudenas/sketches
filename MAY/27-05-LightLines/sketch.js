let clrs = [5, 250, [255, 0, 85],
	[85, 0, 255]
]
let img
let brightMax = 250
let blobs = []
let threshold = 3
let minDist = 2

//————————————————————————————————————————————————————————————————————————————————— preload
function preload() {
	img = loadImage('assets/photo.jpg', () => console.log(`image loaded`))
}

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540)

	saveSetup()

	console.log(img.width, img.height)
	img.resize(0, height)
	img.filter(GRAY)
	// noLoop()

	// get all the blobs
	img.loadPixels()
	for (let x = 0; x < img.width; x++) {
		for (let y = 0; y < img.height; y++) {
			let index = (x + y * img.width) * 4
			let bright = (img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3

			if (bright > brightMax) {
				let record = Infinity
				let recordIndex = 0
				for (let i = 0; i < blobs.length; i++) {
					let elm = blobs[i]
					if (elm.isNear(x, y) < record) {
						record = elm.isNear(x, y)
						recordIndex = i
					}
				}

				if (record > threshold) {
					blobs.push(new blob(x, y))
				} else {
					blobs[recordIndex].add(x, y)
				}
			}
		}
	}

	console.log('calculating ––done')
	// check if blobs are near each other
	for (let i = blobs.length - 1; i >= 0; i--) {
		let elm = blobs[i]
		for (let j = 0; j < blobs.length; j++) {
			let other = blobs[j]
			if (elm.isClose(other) && elm != other) {
				blobs.splice(i, 1)
				break
			}
		}
	}

	// convert to usable variables
	blobs.forEach((elm) => elm.convert())
	console.log('threshold remove similar ––done')
	console.log(blobs.length)
}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0])
	let adjustX = (width - img.width) / 2
	translate(adjustX, 0)
	image(img, 0, 0)
	filter(BLUR, 1);
	filter(OPAQUE);

	noFill()
	// blobs.forEach((elm) => elm.show())
	stroke(clrs[1])
	strokeWeight(1)
	blobs.forEach((elm) => {
		if (!elm.taken) {
			let other = random(blobs)
			while (other.taken) {
				other = random(blobs)
			}
			drawLine(elm, other)
		}
	})

	blobs.forEach((elm) => elm.taken = false)

	saveDraw()
}

//————————————————————————————————————————————————————————————————————————————————— drawLine
function drawLine(elm, other) {
	line(elm.x, elm.y, other.x, other.y)
	elm.taken = true
	other.taken = true
}