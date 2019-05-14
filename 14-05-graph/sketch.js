let clrs = [250, 5, [255, 0, 85]]

let data, len
let xpadd, ypadd, txtpadd

let txt = 'booooooom'

let situation = true

function preload() {
	data = loadJSON('data/data.json', () => {
		console.log('data loaded')
	})
}

function setup() {
	createCanvas(800, 500).parent(select('#canvas'))
	pixelDensity(2)

	len = Object.keys(data).length
	xpadd = width / 20
	ypadd = height / 4
	txtpadd = height / 40

	guiSetup()
	noLoop()
}

function draw() {
	if (situation) {
		let infElmnts = document.getElementsByClassName('information')
		for (let i = 0; i < infElmnts.length; i++) infElmnts[i].setAttribute('style', 'display:none')

		let sitElmnts = document.getElementsByClassName('situation')
		for (let i = 0; i < sitElmnts.length; i++) sitElmnts[i].setAttribute('style', 'display:true')

		situationDraw()
	} else {
		let infElmnts = document.getElementsByClassName('information')
		for (let i = 0; i < infElmnts.length; i++) infElmnts[i].setAttribute('style', 'display:true')

		let sitElmnts = document.getElementsByClassName('situation')
		for (let i = 0; i < sitElmnts.length; i++) sitElmnts[i].setAttribute('style', 'display:none')

		informationDraw()
	}
}

function saveFrame() {
	var regex = /\s+/g;
	txt = txt.replace(regex, '-')
	save(`${txt}.png`)
}

// let json = {
// 	about: {
// 		age: 0,
// 		sex: true, // true women false man undefined kita
// 		education: true, // true aukstasis false nebaigtas aukstasis
// 		cristian: true, // true / false
// 		practising: true, // true / false
// 	},
// 	time: {
// 		start: "11:11:11",
// 		end: "11:11:11",
// 		duration: 42
// 	},
// 	sit: {
// 		[0]: [1, 2, 3, 4, 5, 6],
// 		[1]: [1, 2, 3, 4, 5, 6],
// 		[2]: [1, 2, 3, 4, 5],
// 		[3]: [1, 2, 3, 4, 5, 6, 7],
// 	}
// }