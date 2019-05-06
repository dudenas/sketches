let clrs = [250, 5];
let time = 0;
let wave = [];
let speed = 0.05;
let SW = 2;
let minRadius = 10;

function setup() {
	createCanvas(540, 540);
}

function draw() {
	background(clrs[0]);
	translate(width / 4, height / 2);
	let x = 0;
	let y = 0;
	let radius = 0;

	for (let i = 0; i < 4; i++) {
		let n = i * 2 + 1;
		let prevx = x;
		let prevy = y;

		radius = width / 8 * (4 / (n * PI));
		x += radius * cos(n * time);
		y += radius * sin(n * time);

		stroke(clrs[1]);
		strokeWeight(SW / 4);
		noFill();
		ellipse(prevx, prevy, radius * 2);
		strokeWeight(SW);
		line(prevx, prevy, x, y);

	}

	translate(width / 4, 0);
	line(x - width / 4, y, 0, y);
	wave.unshift(y);
	beginShape();
	for (let i = 0; i < wave.length; i++) {
		vertex(i, wave[i]);
	}
	endShape();
	if (wave.length >= 200) {
		wave.pop();
	}

	time += speed;
}