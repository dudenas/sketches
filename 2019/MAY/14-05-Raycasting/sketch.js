let clrs = [5, 250]
let SW = 1
let r = 2
let nr = 2
let totalFrames = 600

let walls = []
let particle
let change = false

function setup() {
	createCanvas(540, 540)
	noStroke()
	fill(clrs[0], 255)
	rect(0, 0, width, height)
	let padd = -20
	for (let i = 0; i < 5; i++) {
		wall = new Boundary(random(-padd, width + padd), random(-padd, height + padd), random(-padd, width + padd), random(-padd, height + padd))
		walls.push(wall)
	}
	walls.push(new Boundary(-padd, -padd, width + padd, -padd))
	walls.push(new Boundary(width + padd, -padd, width + padd, height + padd))
	walls.push(new Boundary(width + padd, height + padd, -padd, height + padd))
	walls.push(new Boundary(-padd, height + padd, -padd, -padd))

	particle = new Particle()
	saveSetup()
}

function draw() {
	if (frameCount % (totalFrames / 4) == 0) change = !change
	if (change) blendMode(SCREEN)
	else blendMode(NORMAL)
	fill(clrs[0], 25)
	rect(-5, -5, width + 10, height + 10)

	for (let wall of walls) {
		wall.show()
	}
	particle.look(walls)

	let angle = map(frameCount / totalFrames, 0, 1, 0, TWO_PI)
	let xoff = nr * cos(angle)
	let yoff = nr * sin(angle)
	let noiseX = map(noise(xoff, yoff), 0, 1, 0, width)
	let noiseY = map(noise(xoff + 100, yoff + 100), 0, 1, 0, height)
	particle.update(noiseX, noiseY)
	particle.show()

	saveDraw()
}