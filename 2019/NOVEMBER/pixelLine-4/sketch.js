const clrs = [5, 5]
const totalFrames = 210
const total = 6

let d
let ny = 0
let img

function setup() {
	createCanvas(540, 540)
	pixelDensity(2)
	noStroke()
	textAlign(CENTER, CENTER)
	textSize(32)
	d = pixelDensity()
	saveSetup()

	// loadimage
	img = loadImage("assets/img-crop.jpg", () => {
		console.log('image loaded')
		img.resize(height / 4, 0)
	})

}

function draw() {
	background(clrs[0])
	fill(clrs[1])
	for (let i = 0; i < total; i++) {
		drawImage(i * (img.height - 1), i)
	}
	let curr = []
	loadPixels();
	for (let x = 0; x < width; x++) {
		let i = 4 * (x * d + height / 2 * d * width * d)
		curr.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]])
	}
	updatePixels()
	for (let x = 0; x < width; x++) {
		fill(curr[x][0], curr[x][1], curr[x][2], curr[x][3])
		rect(x - 0.5, height / 2, 1, height / 2)
	}
	percent = frameCount % totalFrames / totalFrames
	ny = map(percent, 0, 1, 0, img.height * 2);
	saveDraw()
}

function drawImage(padd, index) {
	push()
	if (index % 2 == 0) {
		scale(1.0, -1.0)
		image(img, width / 2 - img.width / 2, -ny - padd + img.height * total / 2 - img.height)
	} else {
		image(img, width / 2 - img.width / 2, ny + padd - img.height * total / 2)
	}
	pop()
}