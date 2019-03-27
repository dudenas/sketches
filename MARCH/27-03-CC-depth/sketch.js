let TOTAL = 25;
let r = 300;
let newr = r;
let d = 0.98;
let pg;

function setup() {
	createCanvas(540, 540);
	pixelDensity(2);
	pg = createGraphics(width, height);
}

function draw() {
	background(250);

	blendMode(OVERLAY);
	// translate(width / 2, height / 2 + 50);
	noStroke();

	newr = r;
	let x = 0;
	for (let i = 0; i < TOTAL; i++) {
		fill(5, 5, 5, 55);
		ellipse(width / 2, height / 2 + x + 50, newr, newr);
		newr *= d;
		x -= d * 4;
		if (newr <= 0) newr = 0;
	}
	// push();
	newr = r;
	for (let i = 0; i < TOTAL; i++) {
		pg.noStroke();
		pg.fill(85, 5, 255, 15);
		pg.ellipse(width / 4, height / 4 - 50, newr, newr);
		newr *= d;
		if (newr <= 0) newr = 0;
	}
	pg.filter(BLUR, 24);
	image(pg, 0, 0);

	// pop();

	noLoop();
}