let clrs = [5, 250, [255, 0, 85], 125]
let img
let offset = 25
let end = 55
let grid = []
let values
let scl = 10

//————————————————————————————————————————————————————————————————————————————————— Preload
function preload() {
	img = loadImage('assets/photo.jpg')
}

//————————————————————————————————————————————————————————————————————————————————— Setup
function setup() {
	createCanvas(540, 540).parent('#canvas')
	img.resize(width, 0)

	pixelDensity(2)
	//create a synth and connect it to the master output (your speakers)
	let options = {
		oscillator: {
			type: triangle
		},
		envelope: {
			attack: 0.01,
			decay: 0.5,
			sustain: 0.1,
			release: 0.5
		}
	}
	var synth = new Tone.Synth([options]).toMaster()


	//attach a click listener to a play button
	document.querySelector('button').addEventListener('click', () => {
		Tone.start()

		//play a middle 'C' for the duration of an 8th note
		synth.triggerAttackRelease("C4", "8n")
		// synth.triggerAttackRelease('C4', '8n', 0)
		// synth.triggerAttackRelease('E4', '8n', '8n')
		// synth.triggerAttackRelease('G4', '8n', '4n')
	})

	image(img, 0, 0)
	img.loadPixels()
	for (let x = 0; x < img.width; x++) {
		let min = 0.15
		let findMind = Infinity
		let yvalue = 0
		for (let y = height / 2 + offset; y >= height / 2 + offset - end; y--) {
			let index = (x + y * (img.width)) * 4
			let b1 = brightness(img.pixels[index + 0]);
			let b2 = brightness(img.pixels[index + 1]);
			let b3 = brightness(img.pixels[index + 2]);
			// get avarege from the values
			let b = (b1 + b2 + b3) / 3;
			// remap values
			b = map(b, 0, 100, 0, 1);
			// img.pixels[index] = 0
			// test function for the maximum value
			// if (b < min) {
			// 	// min = b;
			// 	yvalue = y
			// }
			if (b < min) {
				findMin = b
				yvalue = y
			}
			img.pixels[index + 3] -= 100
		}
		noFill()
		stroke(clrs[1])
		strokeWeight(2)
		point(x, yvalue)
		// normalize value
		yvalue = map(yvalue, height / 2 + offset, height / 2 + offset - end, 0, 1)
		grid[x] = yvalue;
		// grid.push(findMin);
	}
	// console.log(grid)
	values = avarageValues(grid, scl)
	// console.log(values)
	img.updatePixels()
}

//————————————————————————————————————————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0])
	image(img, 0, 0)
	filter(GRAY)
	stroke(clrs[2])
	strokeWeight(1)
	noFill()
	line(0, height / 2 + offset, width, height / 2 + offset)
	line(0, height / 2 + offset - end, width, height / 2 + offset - end)

	stroke(clrs[1])
	beginShape()
	for (let i = 0; i < grid.length; i++) {
		let curr = grid[i]
		let value = map(curr, 0, 1, height / 2 + offset, height / 2 + offset - end)
		vertex(i, value)
	}
	endShape()

	noStroke()
	fill(clrs[1])
	for (let i = 0; i < values.length; i++) {
		let curr = values[i]
		let value = map(curr, 0, 1, 0, height / 2 + offset)
		rect(i * scl, height, scl, -value)
	}
}

//————————————————————————————————————————————————————————————————————————————————— getAvarage
function avarageValues(arr, step) {
	let newArr = []
	for (let i = 0; i < arr.length; i += step) {
		let value = 0
		for (let j = i; j < i + step; j++) {
			value += arr[j]
		}
		value /= step
		newArr.push(value)
	}
	return newArr
}