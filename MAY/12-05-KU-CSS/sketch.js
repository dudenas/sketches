let clrs = [
	[85, 0, 255],
	[255, 0, 85],
	[250, 250, 250]
]
const BG = {
	'FIRST': 0,
	'SECOND': 1,
	'THIRD': 2
}

let current = BG['FIRST']
let alpha = 5

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight).parent('#canvas')
	select('.item-1').mouseClicked(() => current = BG['FIRST'])
	select('.item-2').mouseClicked(() => current = BG['SECOND'])
	select('.item-3').mouseClicked(() => current = BG['THIRD'])

	select('.menu-save').mouseClicked(() => console.log('save'))

	select('.menu-graph').mouseClicked(() => console.log('show graph'))
}

function draw() {
	background(clrs[current][0], clrs[current][1], clrs[current][2], alpha)
}