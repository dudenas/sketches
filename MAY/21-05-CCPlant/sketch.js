let clrs = [5, 250, [255, 0, 85], 125]
let startLen = 135
let levels = 6
let angle = Math.PI / 8
let decrease = 0.718
let SW = 1
let myFont
let debug = false
let ease, styles;

//————————————————————————————————————————————————————————————————————————————————— Preload
function preload() {
	myFont = loadFont('assets/Silka-medium.otf', () => console.log('font loaded'))
}

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540)

	// easing functions
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['circularOut'];

	tree[0] = new Branch(createVector(), createVector(0, -startLen))
	tree[0].branch(1, 0, angle)
	tree[0].branch(-1, 0, angle)
	// noLoop()

	saveSetup()
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0])
	translate(width / 2, height - startLen / 2)
	tree.forEach(elm => {
		if (elm.parent) {
			if (elm.parent.finnished) {
				elm.update()
				elm.show()
			}
		} else {
			elm.update()
			elm.show()
		}
	})

	saveDraw()
}

function keyPressed() {
	if (key == 'D' || key == 'd') debug = !debug
	if (key == 'R' || key == 'r') redraw()
}