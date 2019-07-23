let clrs = [250, 5, [255, 0, 85]]

function setup() {
	createCanvas(540, 540)
	setupGrfc()
	frameRate(30)
}

function draw() {
	background(clrs[0])
	translate(width / 2, height / 2)
	stroke(clrs[1])
	strokeWeight(1)
	line(0, -height / 2, 0, height / 2)
	line(-width / 2, 0, width / 2, 0)
	showGrfc()
	updateGrfc()
}