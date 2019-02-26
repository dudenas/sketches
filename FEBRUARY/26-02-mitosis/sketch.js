let clrs = {
	'bg': [250, 250, 250],
	'main': [85, 0, 255],
}

let speed = 0.005;
let blobs = [];
let TOTAL;
let r;

function setup() {
	createCanvas(windowWidth, windowHeight);
	TOTAL = 20;
	r = windowWidth > windowHeight ? windowWidth / 30 : windowHeight / 30;
	for (let i = 0; i < TOTAL; i++) {
		let pos = createVector(random(width), random(height));
		addBlob(pos, r);
	}
}

function draw() {
	background(clrs['bg']);
	blobs.forEach(obj => {
		obj.show();
		obj.move();
	})

	for (let i = blobs.length - 1; i >= 0; i--) {
		if (blobs[i].touched) blobs.splice(i, 1);
	}
}

function mousePressed() {
	let mpos = createVector(mouseX, mouseY);
	blobs.forEach((obj, index) => {
		let d = dist(mpos.x, mpos.y, obj.pos.x, obj.pos.y);
		if (d < obj.r) {
			obj.mitosis();
		}
	})
}