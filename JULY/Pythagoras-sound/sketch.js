let clrs = [250, 5]

function setup() {
	createCanvas(540, 540)
	setupGrfc()
	noLoop()
}

function draw() {
	background(clrs[0])
	translate(width / 2, height / 2)
	line(0, -height / 2, 0, height / 2)
	line(-width / 2, 0, width / 2, 0)
	showGrfc()
}