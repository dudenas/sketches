const clrs = [5, 250]
const totalSegments = 7
const totalLines = 23 // 23
const SW = 1
const paddY = 125
const txtSize = 8

let grfc = []
let myFont
let len, x
let allVal = []
let ease, styles

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
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceInOut'];
	// noLoop()
	resetGrfc()

	// save
	saveSetup()
}

// ————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0])
	translate(-paddX, 0)

	let index = 0
	grfc.forEach(elm => {
		for (let i = elm.segments.length - 1; i >= 0; i--) {
			const seg = elm.segments[i]
			if (seg.txt) {
				index = seg.setTxt(index)
			}
		}
	})

	grfc.forEach(elm => {
		elm.show()
	})

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
			// edge case
			let txt = true
			if ((j == 0 || j == totalLines - 1) && display == 0) {
				txt = false
			}
			arr.push(new Segment(x, len, display, i, txt))
			if (j == 0) allVal.push([len, x])
			const temp = len
			len = temp / 1.414
			x -= (len + temp)
		}
		grfc.push(new Grfc(arr, y, j))
	}

	// set first values for animation
	grfc.forEach(elm => {
		elm.show()
	})

	// set padding to shift to the middle
	paddX = (x + len) / 2
}