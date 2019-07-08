let clrs = [250, 5]
let rows, cols
let scl = 1
let grfc = []
let SWborder = 2
let SWInside = 1
let SWPoint = 3
let SWLine = 4
let grid = 6
let gridSize
let saveIt = false
let saveGrfc = 0
let cvs

function setup() {
	createCanvas(540, 540, SVG)
	pixelDensity(1)
	scale(1 / 3)
	setupGrfc()
	// STYLE
	strokeCap(SQUARE)
	strokeJoin(BEVEL)
}

function draw() {
	background(clrs[0])

	drawGrfc()

	// save svg
	if (saveIt) {
		save()
	}

	// update which grfc to save
	// if (saveGrfc == 0) noLoop()
}

function setupGrfc() {
	rows = scl
	cols = scl
	scl = width / scl
	gridSize = scl / grid
	console.log(rows, cols, scl, gridSize)

	resetGrfc()
}

function resetGrfc() {
	grfc = []
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