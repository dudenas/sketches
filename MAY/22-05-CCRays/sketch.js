// style
let clrs = [250, 5, [255, 0, 85]]
let scl = 24
let r
let SW = 2
let lines = []
let gap = 20
let minSize = 20
let txtSize = 9
let myFont
let index = 0
let totalFrames = 60

//————————————————————————————————————————————————————————————————————————————————— Preload
function preload() {
	myFont = loadFont('assets/Silka-medium.otf', () => console.log('font loaded'))
}

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540)
	strokeCap(SQUARE)
	textFont(myFont)
	textSize(txtSize)

	r = width / 3

	saveSetup()
	if (!save) noLoop()
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	createGrfc()
	background(clrs[0])

	translate(width / 2, height / 2)
	if (showText) rotate(-PI / 3)
	rotate(-PI / 3)
	lines.forEach(elm => elm.show())

	saveDraw()
}

//————————————————————————————————————————————————————————————————————————————————— KeyPressed
function keyPressed() {
	if (key == 's' || key == 'S') {
		save(`${SW}-${index++}.png`)
		redraw()
	}

	if (key == 't' || key == 'T') {
		showText = !showText
		redraw()
	}
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