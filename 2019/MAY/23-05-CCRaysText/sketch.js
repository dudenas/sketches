// style
let clrs = [250, 5, [255, 0, 85]]
let scl = 24
let r
let SW = 2
let lines = []
let gap = 120
let minSize = 20
let txtSize = 8
let myFont
let index = 0

//————————————————————————————————————————————————————————————————————————————————— Preload
function preload() {
	myFont = loadFont('assets/Silka-medium.otf', () => console.log('font loaded'))
}

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(800, 600)
	strokeCap(SQUARE)
	textFont(myFont)
	textSize(txtSize)

	r = width / 3

	saveSetup()
	createGrfc()
	if (!save) noLoop()
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0])
	scale(0.8)

	translate(width / 2 + width * 0.2 / 2, height / 2 + height * 0.2 / 2)
	rotate(-PI / 2)
	lines.forEach(elm => {
		elm.update()
		elm.show()
	})

	saveDraw()
}

//————————————————————————————————————————————————————————————————————————————————— createGrfc
function createGrfc() {
	lines = []
	for (let i = 0; i <= scl; i++) {
		let x = map(i, 0, scl, -r, r)
		let y1 = -r * sqrt(1 - pow((x / r), 2))
		if (y1 == 0) y1 = -r / (scl / 4)
		let y2 = y1 * -1
		lines.push(new gLine(createVector(x, y1), createVector(x, y2), true))
	}
}