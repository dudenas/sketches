let font

let clrs = [5, 250]
let SW = 1
let alpha = 255
let dt = 1

let scl = 159
let word = []
let walls = []
let particle
let fps
let totalFrames = 300

// ————————————————————————————————————————————————————————————————————————————————— preload
function preload() {
	font = loadFont('assets/Silka-Bold.otf')
}

// ————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(800, 600)

	word.push(new Letter('S', -width / 3, -height / 5))
	word.push(new Letter('H', -width / 30, -height / 5))
	word.push(new Letter('A', width / 3, -height / 5))
	word.push(new Letter('D', -width / 3, height / 5))
	word.push(new Letter('O', -width / 30, height / 5))
	word.push(new Letter('W', width / 3, height / 5))

	particle = new Particle()
	// noLoop()

	fps = createP().style('font-size', '36px')
	saveSetup()
}

// ————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0])

	translate(width / 2, height / 2)
	for (let letter of word) {
		letter.show()
	}

	particle.look(walls)

	const percent = (frameCount % totalFrames) / totalFrames
	const paddx = map(sin(percent * TWO_PI + PI / 2), -1, 1, 0, width / 5)
	const paddy = map(cos(percent * TWO_PI + PI / 2), -1, 1, 0, width / 5)
	const x = map(sin(percent * TWO_PI), -1, 1, -paddx, width + paddx)
	const y = map(cos(percent * TWO_PI), -1, 1, -paddy, height + paddy)
	particle.update(x - width / 2, y - height / 2)

	fps.html(floor(frameRate()))

	saveDraw()
}