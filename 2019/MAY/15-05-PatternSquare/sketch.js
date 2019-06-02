let clrs = [5, 250]

let scl = 90 
let padd = 1

let rows, cols
let cells = []

let totalFrames = 120

function setup() {
	createCanvas(540, 540)

	// set cols and rows based on scale
	cols = floor(width / scl)
	rows = floor(height / scl)

	createPattern()

	saveSetup()
}

function draw() {
	background(clrs[0])
	createPattern()

	push()
	drawPattern()
	translate(0, rows * scl / 2)
	scale(1, -1)
	translate(0, -rows * scl / 2)
	drawPattern()
	pop()

	push()
	scale(-1, 1)
	translate(-cols * scl, 0)
	drawPattern()
	translate(0, rows * scl / 2)
	scale(1, -1)
	translate(0, -rows * scl / 2)
	drawPattern()
	pop()

	saveDraw()
}

// pattern create
function createPattern() {
	cells = []
	for (let i = padd; i < cols / 2; i++) {
		for (let j = padd; j < rows / 2; j++) {
			if (random(1) > 1 / 1.618) cells.push(new Cell(i, j))
		}
	}
}

// pattern draw
function drawPattern() {
	for (let cell of cells) cell.show()
}

// cell class
class Cell {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	show() {
		noStroke()
		fill(clrs[1])
		if (random(1) > 0.1) rect(this.x * scl, this.y * scl, scl, scl)
	}
}