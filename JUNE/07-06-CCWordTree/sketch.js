const clrs = [250, 5]
const totalSegments = 7
const totalLines = 23
const SW = 1
const paddY = 125
const txtSize = 8

let grfc = []
let paddX
let myFont
let len, x

// ————————————————————————————————————————————————————————————————————————————————— preload
function preload() {
	myFont = loadFont('assets/Silka-Medium.otf', () => console.log('font loaded'))
}

// ————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	// style font
	textFont(myFont)
	textAlign(CENTER, CENTER)
	textSize(txtSize)

	resetGrfc()
	// set padding to center x
	paddX = (x + len) / 2

	// save
	saveSetup()
}

// ————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0])
	translate(-paddX, 0)

	grfc.forEach(elm => {
		elm.show()
	})

	resetGrfc()
	saveDraw()
}

// ————————————————————————————————————————————————————————————————————————————————— reset
function resetGrfc() {
	grfc = []
	// set grfc

	for (let j = 0; j < totalLines; j++) {
		len = width / 7
		x = width - len
		const y = map(j, 0, totalLines - 1, paddY, height - paddY)
		const arr = []
		const side = j % 2
		for (let i = 0; i < totalSegments; i++) {
			const display = (i + side) % 2 == 0
			arr.push(new Segment(x, len, display))
			const temp = len
			len = temp / 1.414
			x -= (len + temp)
		}
		grfc.push(new Grfc(arr, y))
	}

	let index = 0
	grfc.forEach(elm => {
		for (let i = elm.segments.length - 1; i >= 0; i--) {
			const seg = elm.segments[i]
			seg.phrase = ''
			if (seg.txt) index = seg.setTxt(index)
		}
	})
}