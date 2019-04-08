let n = 0;
let c = 6;
let special = 137.6;//137.5;
let ell_size = 6;
let clrs;

//———————————————————————————————————— setupVariables
function setupVariables() {
	// setup variables
	clrs = {
		'bg': color(5, 5, 5),
		'main': color(250, 250, 250),
		'sub': color(85, 0, 255)
	}
}

//———————————————————————————————————— setup
function setup() {
	createCanvas(600, 600);
	saveSetup();
	setupVariables();
	angleMode(DEGREES);
	background(clrs['bg']);
}

//———————————————————————————————————— draw
function draw() {
	rotate(map(sin(frameCount * 0.5), -1, 1, 2, -2));
	translate(width / 2, height / 2);
	for (let i = 0; i < 3; i++) {
		let a = n * special;
		let r = c * sqrt(n);

		let x = r * cos(a);
		let y = r * sin(a);

		noStroke();
		fill((a - n) % 256);
		// fill(clrs['main']);
		ellipse(x, y, ell_size, ell_size);

		// n += floor(map(sin(frameCount*0.1),-1,1,1,3));
		n++;
	}
	saveDraw();
}

//———————————————————————————————————— setup