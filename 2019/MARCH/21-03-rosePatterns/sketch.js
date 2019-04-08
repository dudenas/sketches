let clrs = [250, 5];

let totalPoints = 800;
let r = 200;
let SW = 2;
let n = 9;
let d = 1;
let k = n / d;
let index = 0;
let speed = 12;

let slider_d, slider_n;

function setup() {
	createCanvas(600, 600);
	saveSetup();
	speed = PI / 78.25;
	slider_d = createSlider(1, 9, 2, 0.1);
	slider_n = createSlider(1, 9, 3, 0.1);
}

function draw() {
	// d = slider_d.value();
	// n = slider_n.value();
	let percent = frameCount / totalFrames;
	d += sin(percent) * speed;
	k = n / d;

	background(clrs[0]);
	translate(width / 2, height / 2);
	stroke(clrs[1]);
	strokeWeight(SW);
	noFill();
	beginShape();
	for (let i = 0; i < totalPoints; i++) {

		let theta = map(i, 0, totalPoints, 0, TWO_PI * d);

		let x = r * cos(k * theta) * cos(theta);
		let y = r * cos(k * theta) * sin(theta);
		vertex(x, y);
	}
	endShape();
	saveDraw();
}