let clrs = [250, 5, [85, 0, 255]]
let time = 0
let SW = 2
let total = 200
let noiseMax = 3

let x = []
let fourierY, fourierX
let path = []
let r;
let step = 0,
	totalSteps = 13

function setup() {
	createCanvas(540, 540)
	pixelDensity(2)

	strokeCap(ROUND)
	strokeJoin(ROUND)

	r = width / 3
	rockCreate()

	background(clrs[0])
}

function draw() {
	let v = epicycle(width / 2, height / 2, 0, fourierX)
	path.unshift(v)

	beginShape()
	for (let i = 0; i < path.length; i++) {
		vertex(path[i].x, path[i].y)
	}
	endShape()
	if (path.length == total + 5) {
		r = random(width / 20, width / 3)
		// r -= width / (totalSteps * 2)
		r -= width / 40
		rockCreate();
		step++;
	}

	if (step == totalSteps) {
		// save();
		noLoop();
	}

	const dt = TWO_PI / fourierX.length
	time += dt
}

function epicycle(x, y, rotation, fourier) {
	for (let i = 0; i < fourier.length; i++) {
		let curr = fourier[i]

		let prevx = x
		let prevy = y

		let freq = curr.freq
		let radius = curr.amp
		let phase = curr.phase
		x += radius * cos(freq * time + phase + rotation)
		y += radius * sin(freq * time + phase + rotation)

		stroke(clrs[2][0], clrs[2][1], clrs[2][2], 5)
		strokeWeight(SW / 4)
		noFill()
		ellipse(prevx, prevy, radius * 2)
		stroke(clrs[1], 5)
		strokeWeight(SW)
		line(prevx, prevy, x, y)
	}

	return createVector(x, y)
}

function rockCreate() {
	path = []
	x = []
	start = random(100)
	for (let i = 0; i < total; i++) {
		let angle = map(i, 0, total, 0, TWO_PI)
		let xoff = map(cos(angle), -1, 1, 0, noiseMax)
		let yoff = map(sin(angle), -1, 1, 0, noiseMax)
		let na = map(noise(xoff + start, yoff), 0, 1, -50, 50)
		let nb = map(noise(yoff, xoff + start), 0, 1, -50, 50)
		let a = r * cos(angle) + na
		let b = r * sin(angle) + nb
		const c = new Complex(a, b)
		x.push(c)
	}
	fourierX = dft(x)

	fourierX.sort((a, b) => b.amp - a.amp)
}