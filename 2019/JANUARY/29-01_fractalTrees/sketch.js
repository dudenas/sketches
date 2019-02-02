let clrs = {
	main: [5, 5, 5],
	bg: [250, 250, 250]
}

const e = 2.71828 / 1.618;
const scl = 1 / (e);
let angle;
let slider;

function setup() {
	createCanvas(800, 800);
	slider = createSlider(0, 10, 1, 0.1);
}

function draw() {
	angle = PI / e / slider.value();
	background(color(clrs["bg"]));

	let len = 100;
	strokeWeight(1);
	stroke(color(clrs["main"]));
	noFill();

	// make a branch
	translate(width / 2, height / 2);
	branch(len);
	rotate(PI/2);
	branch(len);
	rotate(PI/2);
	branch(len);
	rotate(PI/2);
	branch(len);
}

function branch(len) {
	push();
	line(0, 0, 0, -len);
	translate(0, -len);

	if (len > 4) {
		// rotate to one angle
		push();
		rotate(angle);
		branch(len * scl);
		pop();
		// rotate to another angle
		push();
		rotate(-angle);
		branch(len * scl);
		pop();
	};
	pop();
}