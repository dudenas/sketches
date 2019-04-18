let clrs = [5, 250, [0, 0, 250]];
let SW_1 = 1;
let SW_2 = 1.25;
let SW_3 = 1.5;
let scl = 4;
let totalFrames = 75;

function setup() {
	createCanvas(540, 540);
	frameRate(30);
	strokeCap(SQUARE);
	saveSetup();
}

function draw() {
	background(clrs[0]);

	let percent = (frameCount % totalFrames) / totalFrames;
	let padd = map(sin(percent * TWO_PI), -1, 1, TWO_PI / 8 * 3.5, TWO_PI / 8 * 6.5);
	let special = map(cos(percent * TWO_PI), -1, 1, 10, 1);
	scl = map(sin(percent * TWO_PI), -1, 1, 4, 16);
	let r = map(cos(percent * TWO_PI), -1, 1, 25, 100);
	for (let n = 0; n < 4; n++) {
		let x1 = 0;
		let y1 = 0;
		let x2 = 0;
		let y2 = 0;
		for (let i = 0; i < scl; i++) {
			switch (n) {
				case 0:
					x1 = width / scl * i;
					y1 = 0;
					break;
				case 1:
					x1 = width;
					y1 = height / scl * i;
					break;
				case 2:
					x1 = width - width / scl * i;
					y1 = height;
					break;
				case 3:
					x1 = 0;
					y1 = height - height / scl * i;
					break;
			}

			let angle = map((i + n * scl), 0, 4 * (scl), 0 + padd, TWO_PI + padd);
			x2 = width / 2 + r * cos(angle);
			y2 = height / 2 + r * sin(angle);

			stroke(clrs[1]);
			noFill();
			let a = createVector(x1, y1);
			let b = createVector(x2, y2);
			push();
			translate(a.x, a.y);
			strokeWeight(SW_1);
			line(0, 0, b.x - a.x, b.y - a.y);
			let d = p5.Vector.dist(b, a);
			let ratio = map(d, 0, width, 2, 1);
			b.setMag(b.mag() / (ratio * special));
			a.setMag(a.mag() / (ratio * special));
			strokeWeight(SW_2);
			line(0, 0, b.x - a.x, b.y - a.y);
			b.setMag(b.mag() / (ratio * special));
			a.setMag(a.mag() / (ratio * special));
			strokeWeight(SW_3);
			line(0, 0, b.x - a.x, b.y - a.y);
			pop();
		}
	}
	// noLoop();
	saveDraw();
}