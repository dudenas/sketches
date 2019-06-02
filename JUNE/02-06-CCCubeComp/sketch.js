let clrs = [250, 5]
let rows, cols
let scl = 3
let grfc = []
let SWborder = 2
let SWinside = 1
let SWLine = 4
let grid = 6
let gridSize

function setup() {
	createCanvas(540, 540)
	setupGrfc()
	strokeCap(SQUARE)
	strokeJoin(BEVEL)
	noLoop()
}

function draw() {
	background(clrs[0])
	drawGrfc()
}

function setupGrfc() {
	rows = scl
	cols = scl
	scl = width / scl
	gridSize = scl / grid

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grfc.push(new Grfc(i * scl, j * scl))
		}
	}
}

function drawGrfc() {
	grfc.forEach(elm => {
		elm.show()
	})
}