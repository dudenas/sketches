let clrs = [250, 5];
let SW = 2;
let target;
let totalFrames = 100;
let goldenAngle = 0;
let theta = 0;
let d = 125;

function setup() {
	createCanvas(540, 540);
	target = createVector();
	saveSetup();
}

function draw() {
	background(clrs[0]);

	translate(width / 2, height / 2);
	rotate(-PI / 2 + pow(goldenAngle, 2) - theta);
	translate(-calcMid(d) - d, 0)
	let percent = (frameCount % totalFrames) / totalFrames;

	let stage = map(sin(percent * TWO_PI), -1, 1, 6, 12);
	goldenAngle = map(sin(percent * TWO_PI), -1, 1, -PI / 2, PI / 4);
	theta = map(percent, 0, 1, 0, TWO_PI);
	goldenRect(0, 0, d, 0, stage);

	saveDraw();
}

function goldenRect(x, y, d, angle, stage) {
	translate(x, y);
	rotate(angle);
	let x1 = 0;
	let y1 = 0;

	let x2 = 0;
	let y2 = -d;

	let x3 = d;
	let y3 = -d;

	let x4 = d;
	let y4 = 0;

	let a = createVector(d / 2, y4);
	let b = createVector(x3, y3);
	let r = sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));

	stroke(clrs[1]);
	strokeWeight(SW);
	noFill();

	// line(a.x, a.y, b.x, b.y);
	// ellipse(a.x, a.y, r * 2, r * 2);
	arc(x3, y3, d * 2, d * 2, HALF_PI, PI);
	beginShape();
	vertex(x1, y1);
	vertex(x2, y2);
	vertex(x3, y3);
	vertex(x4, y4);
	endShape(CLOSE);

	if (stage > 1) {
		stage--;
		goldenRect(r + a.x, 0, r - d / 2, goldenAngle, stage);
	} else {
		target.x = 0;
		target.y = 0;
	}
}

function calcMid(d) {
	let x1 = 0;
	let y1 = 0;
	let x2 = 0;
	let y2 = -d;
	let x3 = d;
	let y3 = -d;
	let x4 = d;
	let y4 = 0;
	let a = createVector(d / 2, y4);
	let b = createVector(x3, y3);
	let r = sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
	return (r + d / 2) / 2;
}