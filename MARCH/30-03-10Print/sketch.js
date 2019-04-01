let clrs = [250, 5];
let spacing = 20;
let x = 0,
	y = 0;

let myFont;
let pg;
let SW = 2;
let speed = 10;

function preload() {
	myFont = loadFont('data/Silka-Bold.otf');
}

function setup() {
	createCanvas(540, 540);
	pixelDensity(2);
	background(clrs[0]);

	pg = createGraphics(width, height);
	pg.background(250);
	pg.textFont(myFont);
	pg.textSize(width / 3);
	pg.textAlign(CENTER, CENTER);
	pg.text('D', width / 2 / 2, height / 2 / 2 - 25);
	//image(pg, 0, 0);
}

function draw() {
	for (let i = 0; i < speed; i++) {
		push();
		translate(x, y);
		noFill();
		stroke(clrs[1]);
		strokeWeight(SW);
		let val = floor(random(1) * 100);
		let c = brightness(pg.get(x / 2, y / 2));
		if (c == 0) val = 25;
		else val = map(sin(frameCount * 0.1 * random(1)), -1, 1, 30, 100);
		switch (true) {
			case (val > 60):
				line(0, 0, spacing, spacing);
				break;
			case val > 30:
				line(spacing, 0, 0, spacing);
				break;
			default:
				if (random(1) > 0.5) line(0, spacing / 2, spacing, spacing / 2);
				else line(spacing / 2, 0, spacing / 2, spacing);
				point(0,0);

				break;
		}

		x += spacing;
		if (x > width) {
			x = 0;
			y += spacing;
		} else if (y > height) {
			console.log('finnished');
			noLoop();
		}
		pop();
	}
}