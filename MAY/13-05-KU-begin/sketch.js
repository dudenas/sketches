let pos, newPos
let picked = false
let stage = 0
let menu = false
let start = false
let running = true

function setup() {
	createCanvas(windowWidth, windowHeight).parent('#canvas')
	pos = createVector(width / 2, height / 2)

	select('#nextButton').mousePressed(() => {
		if (stage == 0) {
			select('#startText').remove()
			select('#explainText').show()
			select('#nextButton').html('testi')
			select('#pageNumber').html('2 / 3')
			stage++
		} else if (stage == 1) {
			select('#explainText').remove()
			select('#controllers').show()
			select('#nextButton').html('testi')
			select('#pageNumber').html('3 / 3')
			stage++
		} else {
			select('#controllers').remove()
			select('#nextButton').remove()
			select('#pageNumber').remove()
			document.getElementById('canvas').setAttribute("style", "filter:blur(0); transform:scale(1, 1)")
			menu = true
			start = true
		}
	})

	select('#about').mousePressed(() => {

	})
}

function draw() {
	if (running) {
		if (!picked) {
			newPos = createVector(random(width), random(height))
			picked = true
		} else {
			let dist = p5.Vector.dist(newPos, pos)
			if (dist < 20) picked = false
		}
		background(85, 0, 255)
		fill(5)
		pos = p5.Vector.lerp(pos, newPos, 0.01)
		ellipse(pos.x, pos.y, 200, 200)
	}
	updateDom()
}

function keyPressed() {
	if (start) {
		if (key == 'H') {
			menu = !menu
		}
		if (key == 'D') {
			running = !running
		}
	}
}

function updateDom() {
	if (menu) {
		document.getElementById('menu').setAttribute("style", "transform:translate3d(0, 0, 0)")
		document.getElementById('logo').setAttribute("style", "background: var(--sub-color); left: 4%")
	} else {
		document.getElementById('menu').setAttribute("style", "transform:translate3d(-80vh, 0, 0)")
		document.getElementById('logo').setAttribute("style", "background: var(--main-color)")
		document.getElementById('logo').setAttribute("style", "background: var(--sub-color); left: 10%")
	}
}