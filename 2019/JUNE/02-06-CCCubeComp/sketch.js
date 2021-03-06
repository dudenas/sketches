let clrs = [250, 5]
let rows, cols
let scl = 3
let grfc = []
let SWborder = 2
let SWInside = 1
let SWPoint = 2
let SWLine = 2
let grid = 6
let gridSize

function setup() {
	createCanvas(540, 540)
	setupGrfc()
	// STYLE
	strokeCap(SQUARE)
	strokeJoin(BEVEL)
	// SAVE
	saveSetup()
}

function draw() {
	background(clrs[0])
	drawGrfc()
	if (save) resetGrfc()
	saveDraw()
}

function setupGrfc() {
	rows = scl
	cols = scl
	scl = width / scl
	gridSize = scl / grid

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