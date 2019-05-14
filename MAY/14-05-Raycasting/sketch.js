let clrs = [5, 250]
let SW = 0.75
let r = 4
let nr = 1
let totalFrames = 1200

let walls = []
let particle
let change = false

function setup() {
	createCanvas(540, 540)
	fill(clrs[0], 255)
	rect(0, 0, width, height)
	for (let i = 0; i < 5; i++) {
		wall = new Boundary(random(width), random(height), random(width), random(height))
		walls.push(wall)
	}
	walls.push(new Boundary(0, 0, width, 0))
	walls.push(new Boundary(width, 0, width, height))
	walls.push(new Boundary(width, height, 0, height))
	walls.push(new Boundary(0, height, 0, 0))

	particle = new Particle()
}

function draw() {
	if (frameCount % 240 == 0) change = !change
	if (change) blendMode(SCREEN)
	else blendMode(NORMAL)
	// background(clrs[0])
	fill(clrs[0], 15)
	rect(0, 0, width, height)

	for (let wall of walls) {
		wall.show()
	}
	particle.look(walls)

	let angle = map(frameCount / totalFrames, 0, 1, 0, TWO_PI)
	let xoff = nr * cos(angle)
	let yoff = nr * sin(angle)
	let noiseX = map(noise(xoff, yoff), 0, 1, 0, width)
	let noiseY = map(noise(xoff + 100, yoff + 100), 0, 1, 0, height)
	// SW = map(noise(noiseX / 25, noiseY / 25), 0, 1, 0.25, 0.75)
	particle.update(noiseX, noiseY)
	particle.show()
}