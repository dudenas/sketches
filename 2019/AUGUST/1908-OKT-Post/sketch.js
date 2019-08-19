const clrs = [250, 5, '#E51717']

function setup() {
	createCanvas(540, 540);
}

function draw() {
	background(clrs[0])
	fill(clrs[2])
	square(widht / 2, height / 2, 100)
}