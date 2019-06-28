const clrs = [250, 5]
let data, font
const analysis = {
	directors: {

	}
}

function preload() {
	data = loadJSON('assets/data.json', () => console.log('data loaded'), JSON)
	font = loadFont('assets/Silka-Medium.otf', () => console.log('font loaded'))
}

function setup() {
	createCanvas(540, 540)
	textFont(font)
	textAlign(CENTER, CENTER)
	for (let i = 0; i < Object.keys(data).length; i++) {
		const director = data[i]['Rezisierius']
		if (analysis['directors'][director]) analysis['directors'][director]++
		else analysis['directors'][director] = 1
	}
	console.log(analysis)
	noLoop()
}


function draw() {
	background(clrs[0])
	noStroke()
	fill(clrs[1])
	for (let i = 0; i < Object.keys(analysis['directors']).length; i++) {
		const y = map(i, 0, Object.keys(analysis['directors']).length, 0 + 100, height - 100)
		const elm = Object.keys(analysis['directors'])[i]
		const txtSize = map(analysis['directors'][elm], 1, 10, 4, 10)
		textSize(txtSize)
		text(elm, width / 2, y)
	}
}