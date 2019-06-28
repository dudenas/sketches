const clrs = [5, 250]
const totalElements = 6
const len = 100
let grfc

function setup() {
	createCanvas(540, 540)
	grfc = []
	for (let j = 0; j < 4; j++) {
		const randomSize = []
		const obj = []
		let left = len
		for (let i = 0; i < levels; i++) {
			const temp = random(random(random(left / 2)))
			randomSize.push(temp)
			left -= temp
		}
		for (let i = 0; i < totalElements; i++) {
			const theta = (TWO_PI / totalElements) * i
			obj.push(new Element(theta, randomSize, i))
		}
		grfc.push(obj)
	}
	noLoop()
}

function draw() {
	background(clrs[0])
	translate(width / 2, height / 2)
	const offset = 100
	grfc.forEach((obj, index) => {
		push()
		switch (index) {
			case 0:
				translate(-offset, -offset)
				break
			case 1:
				translate(offset, -offset)
				break
			case 2:
				translate(offset, offset)
				break
			case 3:
				translate(-offset, offset)
				break
		}
		obj.forEach(elm => {
			elm.show()
		})
		pop()
	})
}

function keyPressed() {
	if (key == 'S') save(`${floor(random(1000))}.png`)
	if (key == 'R') {
		setup()
		draw()
	}
}