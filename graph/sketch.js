let clrs = [250, 5, [255, 0, 85]]

let data, len
let xpadd, ypadd, txtpadd

let txt = 'booooooom'

let cristianChecked = false,
	cristianActive = false,
	practisingChecked = false,
	practisingActive = false,
	educationChecked = false,
	educationActive = false,
	sexChecked = false
sexActive = false

function preload() {
	data = loadJSON('data/data-new.json', () => {
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

	// value buttons
	select('#cristian')
		.changed(() => {
			cristianChecked = !cristianChecked
			redraw()
		});

	select('#practising')
		.changed(() => {
			practisingChecked = !practisingChecked
			redraw()
		});

	select('#sex')
		.changed(() => {
			sexChecked = !sexChecked
			redraw()
		});

	select('#education')
		.changed(() => {
			educationChecked = !educationChecked
			redraw()
		});

	select('#cristian_active')
		.changed(() => {
			cristianActive = !cristianActive
			redraw()
		});

	select('#education_active')
		.changed(() => {
			educationActive = !educationActive
			redraw()
		});

	select('#sex_active')
		.changed(() => {
			sexActive = !sexActive
			redraw()
		});

	select('#practising_active')
		.changed(() => {
			practisingActive = !practisingActive
			redraw()
		});


	// save button
	select('#saveButton')
		.mouseClicked(saveFrame);


	// input values
	let input = select('.input_name')
		.changed(() => {
			txt = input.value();
			redraw()
		});
	noLoop()
}

function draw() {

	// calculate max value and set values
	let maxValue = 0
	let minValue = Infinity
	let avg = 0
	// let value = {}
	let value = []
	let count = 0

	let toPick = cristianActive + practisingActive + sexActive + educationActive

	for (let i = 0; i < len; i++) {
		let condition = 0
		let id = data[i]
		// about
		let cristian = id['about']['cristian']
		let practising = id['about']['practising']
		let sex = id['about']['sex']
		let education = id['about']['education']
		let age = id['about']['age']

		// statements for buttons ////////////////////////////////////////////////////////////////////////////////////////////////
		if (cristianActive) {
			if (cristianChecked == cristian) {
				condition++
			}
		}
		if (practisingActive) {
			if (practisingChecked == practising) {
				condition++
			}
		}
		if (sexActive) {
			if (sexChecked == sex) {
				condition++
			}
		}
		if (educationActive) {
			if (educationChecked == education) {
				condition++
			}
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (condition == toPick) {
			value[count] = age
			value.push(age)
			if (maxValue < age) maxValue = age
			if (minValue > age) minValue = age
			avg += age
			count++
		}
	}
	avg /= count

	// draw graph
	background(clrs[0])
	textAlign(CENTER, CENTER)
	textSize(24)
	noStroke()
	fill(clrs[1])
	text(txt, width / 2, height / 10)
	textSize(18)
	text(`total — ${count} | min — ${minValue} | max — ${maxValue} | avg - ${nf(avg,0,2)}`, width / 2, height / 10 + txtpadd * 2)

	textSize(8)
	// let graphlen = Object.keys(value).length
	let graphlen = value.length
	// value.sort()
	for (let i = 0; i < count; i++) {
		let val = value[i]
		let y = map(val, 0, maxValue, height - height / 10, ypadd)
		let x = ((width - xpadd * 2) / graphlen) * (i) + xpadd * 3 / 2
		noStroke()
		fill(clrs[1])
		let up = i % 2 == 0 ? 1 : -1
		text(val, x, y - txtpadd * up)
		stroke(clrs[2])
		strokeWeight(4)
		noFill()
		point(x, y)
	}

	let x = xpadd
	let y1 = ypadd;
	let y2 = height - height / 10
	stroke(clrs[1])
	strokeWeight(1)
	noFill();
	line(x, y1, x, y2)

	textSize(12)
	for (let i = 0; i <= maxValue; i++) {
		let y = map(i, 0, maxValue, height - height / 10, ypadd)
		if (i % 5 == 0) {
			stroke(clrs[1], 75)
			strokeWeight(1)
			noFill();
			line(x, y, width, y)
			noStroke()
			fill(clrs[1])
			text(i, x - txtpadd, y)
		}
	}

	// avg line
	let avgY = map(avg, 0, maxValue, height - height / 10, ypadd)
	stroke(clrs[2])
	strokeWeight(1)
	noFill();
	line(x, avgY, width, avgY)
}

function saveFrame() {
	var regex = /\s+/g;
	txt = txt.replace(regex, '-')
	save(`${txt}.png`)
}

// function draw() {

// }

// let json = {
// 	about: {
// 		age: 0,
// 		sex: true, // true women false man undefined kita
// 		education: true, // true aukstasis false nebaigtas aukstasis undefined kita
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