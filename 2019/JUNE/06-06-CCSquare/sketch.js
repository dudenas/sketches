const clrs = [250, 5]
let myFont
let grfc = []
const padd = 75
const total = 48
const txtSize = 12

// ————————————————————————————————————————————————————————————————————————————————— preload
function preload() {
	myFont = loadFont('assets/Silka-Medium.otf', () => console.log('font loaded'))
}

// ————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540)
	textFont(myFont)
	textAlign(CENTER, CENTER)

	setupGrfc()
	saveSetup()
}

// ————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0])
	translate(width / 2, 0)

	grfc.forEach(elm => {
		elm.update()
		elm.show()
	})
	saveDraw()
}

// ————————————————————————————————————————————————————————————————————————————————— setupGrfc
function setupGrfc() {
	for (let i = 0; i < total; i++) {
		let y = map(i, 0, total - 1, padd / 3 * 2, height - padd)
		grfc.push(new gLine(y, i))
	}
}