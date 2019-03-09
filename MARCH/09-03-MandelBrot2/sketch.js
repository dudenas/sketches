let iter = 0;
let maxIter = 30;
let mandelBrot = [];
let scl = 2;

function setup() {
	createCanvas(800, 800);
	saveSetup();



}

function draw() {
	background(250);
	generate();
	mandelBrotDraw();

	saveDraw();
	if (!save) noLoop();
}

function generate() {
	mandelBrot = [];
	for (let x = 0; x < width; x += scl) {
		for (let y = 0; y < height; y += scl) {
			let a = map(x, 0, width, -2, 2);
			let b = map(y, 0, height, -2, 2);

			let ca = a;
			let cb = b;

			let n = 0;
			let z = 0;
			while (n < iter) {
				let aa = a * a - b * b;
				let bb = 2 * a * b;

				a = aa + ca;
				b = bb + cb;

				if (abs(a + b) > 16) {
					break;
				}
				n++;
			}

			let value = map(n, 0, iter, 0, 1);
			if (n > iter - 1) {
				let mb = {
					x: x,
					y: y,
					value: value
				};
				mandelBrot.push(mb);
			}
		}
	}
}

function mandelBrotDraw() {
	let r = width / 4;
	translate(width / 2, height / 2);
	beginShape();
	for (let i = 0; i < mandelBrot.length; i++) {
		let mb = mandelBrot[i];
		let theta = map(i, 0, mandelBrot.length, 0, TWO_PI);
		let mx = map(mb.x, 0, width, 0, 1);
		let my = map(mb.y, 0, height, 0, 1);
		let x = r * cos(theta * mx);
		let y = r * sin(theta * my);
		noFill();
		stroke(5);
		strokeWeight(1);
		vertex(x, y);
	}
	endShape();

	for (let i = 0; i < mandelBrot.length; i++) {
		let mb = mandelBrot[i];
		let theta = map(i, 0, mandelBrot.length, 0, TWO_PI);
		let mx = map(mb.x, 0, width, 0, 1);
		let my = map(mb.y, 0, height, 0, 1);
		let x = r * cos(theta / mx);
		let y = r * sin(theta / my);
		stroke(mb.value);
		strokeWeight(1);
		stroke(250);
		point(x, y);
	}
}