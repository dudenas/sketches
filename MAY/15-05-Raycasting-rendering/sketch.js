let clrs = [0, 100]
let SW = 0.1
let SWB = 2
let nr = 0.5
let totalFrames = 900
let dt = 0.25

let walls = []
let particle

let sceneW, sceneH

function keyPressed() {
	if (key == 'S') {
		particle.rotate(-0.1)
		console.log(key)
	}
}

function setup() {
	colorMode(HSB, 100)
	createCanvas(1080, 540)
	sceneW = width / 2
	sceneH = height

	for (let i = 0; i < 5; i++) {
		wall = new Boundary(random(0, sceneW), random(0, sceneH), random(0, sceneW), random(0, sceneH))
		walls.push(wall)
	}
	let padd = 10
	walls.push(new Boundary(-padd, -padd, sceneW + padd, -padd))
	walls.push(new Boundary(sceneW, -padd * 3, sceneW, sceneH + padd * 3))
	walls.push(new Boundary(sceneW + padd, sceneH + padd, -padd, sceneH + padd))
	walls.push(new Boundary(-padd / 2, sceneH + padd * 2, -padd / 2, -padd * 2))

	particle = new Particle()
	saveSetup()
}

function draw() {

	if (keyIsDown(65)) {
		particle.rotate(0.05)
	}
	if (keyIsDown(83)) {
		particle.rotate(-0.05)
	}

	background(clrs[0])

	for (let wall of walls) {
		wall.show()
	}
	let angle = map(frameCount / totalFrames, 0, 1, 0, TWO_PI)
	let xoff = nr * cos(angle)
	let yoff = nr * sin(angle)
	let noiseX = map(noise(xoff, yoff), 0, 1, 0, sceneW)
	let noiseY = map(noise(xoff + 100, yoff + 100), 0, 1, 0, sceneH)
	particle.update(noiseX, noiseY)
	particle.show()

	const scene = particle.look(walls)
	const w = sceneW / scene.length
	push()
	translate(sceneW, 0)
	for (let i = 0; i < scene.length; i++) {
		noStroke()
		const sq = scene[i] * scene[i]
		const wSq = sceneW * sceneW
		const b = map(sq, 0, wSq, 100, 0)
		const h = map(sq, 0, wSq, sceneH, 0)
		stroke(b/3*2, b, 100)
		strokeWeight(SWB)
		fill(b/3*2, b, 100)
		rectMode(CENTER)
		rect(i * w + w / 2, sceneH / 2, w, h)
	}
	pop()

	// stroke(clrs[1])
	// strokeWeight(SWB)
	// noFill()
	// line(sceneW, 0, sceneW, sceneH)
	let percent = (frameCount % totalFrames) / totalFrames
	// fov = map(sin(percent * TWO_PI), -1, 1, 30, 120)
	fov = map(sin(percent * TWO_PI), -1, 1, 90, 0)
	particle.updateFOV()
	saveDraw()
}