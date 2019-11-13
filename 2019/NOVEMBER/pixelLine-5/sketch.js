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
	img = loadImage("assets/img-leaf.jpg", () => {
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
	let h = height / 6
	for (let x = 0; x < width; x++) {
		fill(curr[x][0], curr[x][1], curr[x][2], curr[x][3])
		rect(x - 0.5, height / 2, 1, h)
	}
	makePixelLines(curr, 1, h)
	makePixelLines(curr, 2, h)
	percent = frameCount % totalFrames / totalFrames
	ny = map(percent, 0, 1, 0, img.height * 2);
	saveDraw()
}

function makePixelLines(curr, index, h) {
	let temp = [0, 0, 0, 0]
	let avg = 10 * index
	for (let x = 0; x < width; x++) {
		temp[0] += curr[x][0]
		temp[1] += curr[x][1]
		temp[2] += curr[x][2]
		temp[3] += curr[x][3]
		if (x % avg == 0 && x != 0) {
			temp[0] /= avg
			temp[1] /= avg
			temp[2] /= avg
			temp[3] /= avg
			fill(temp[0], temp[1], temp[2], temp[3])
			rect(x - avg, height / 2 + h * index, avg, h)
			temp = [0, 0, 0, 0]
		}
	}
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