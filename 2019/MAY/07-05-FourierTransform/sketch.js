let clrs = [250, 5];
let time = 0;
let SW = 2;
let total = 500;

let y = [],
	x = [];
let fourierY, fourierX;
let path = [];

function setup() {
	createCanvas(540, 540);
	let r = width / 3;
	for (let i = 0; i < total; i++) {
		let angle = map(i, 0, total, 0, TWO_PI);
		x[i] = r * noise(angle);
		y[i] = r * noise(angle + 1000);
	}
	fourierY = dft(y);
	fourierX = dft(x);

	fourierX.sort((a, b) => b.amp - a.amp);
	fourierY.sort((a, b) => b.amp - a.amp);
}

function draw() {
	background(clrs[0]);

	let vx = epiCycle(width / 4, height / 4 * 3, 0, fourierX);
	let vy = epiCycle(width / 4 * 3, height / 4, HALF_PI, fourierY);
	let v = createVector(vx.x, vy.y);
	path.unshift(v);

	// translate(width / 4, height / 4);
	line(vx.x, vx.y, v.x, v.y);
	line(vy.x, vy.y, v.x, v.y);

	beginShape();
	for (let i = 0; i < path.length; i++) {
		vertex(path[i].x, path[i].y);
	}
	endShape();
	if (path.length >= total / 4) {
		path.pop();
	}

	const dt = TWO_PI / fourierY.length;
	time += dt;
}

function epiCycle(x, y, rotation, fourier) {
	for (let i = 0; i < fourier.length; i++) {
		let curr = fourier[i];

		let prevx = x;
		let prevy = y;

		let freq = curr.freq;
		let radius = curr.amp;
		let phase = curr.phase;
		x += radius * cos(freq * time + phase + rotation);
		y += radius * sin(freq * time + phase + rotation);

		stroke(clrs[1]);
		strokeWeight(SW / 4);
		noFill();
		ellipse(prevx, prevy, radius * 2);
		strokeWeight(SW);
		line(prevx, prevy, x, y);
	}

	return createVector(x, y);
}