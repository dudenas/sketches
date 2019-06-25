const clrs = [250, 5]
const SW = 4
const minSW = 0.5
const incr = 0.01
// let walker
let walkers = []
let font
let pg
let finnished = false

function preload() {
	font = loadFont('assets/Silka-Medium.otf', () => console.log('font loaded'))
}

function setup() {
	createCanvas(1080, 1080, P2D);
	pixelDensity(1)
	pg = createGraphics(width, height, P2D)
	pg.textFont(font)
	pg.textAlign(CENTER, CENTER)
	pg.background(0, 0, 0, 0)
	pg.fill(255)
	// pg.textSize(width / 3 * 2)
	// pg.textSize(width / 3)
	pg.textSize(width)
	// pg.text('g', width / 2, height / 2 - height / 2.8)
	pg.text('w', width / 2, height / 2 - height / 6)
	// pg.text('grow', width / 2, height / 2 - height / 5)
	// pg.text('it', width / 2, height / 3 * 1.8)

	for (let i = 0; i < 20; i++) {
		walker = new Walker()
		walkers.push(walker)
	}
	// image(pg, 0, 0)
	// fill(0)
	// textSize(width / 3)
	// textFont(font)
	// textAlign(CENTER, CENTER)
	// text('grow', width / 2, height / 2 - height / 5)
	// text('it', width / 2, height / 3 * 1.8)
	// background(125, 125, 125, 05)
	background(clrs[0])
}

function draw() {
	if (!finnished) {
		walkers.forEach(elm => {
			elm.update()
			elm.show()
		})
		console.log(`${count} / ${total}`)
	} else {
		console.log(`FINNISHED`)
		noLoop()
	}
}