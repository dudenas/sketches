let clrs = [250, 5];
let d = 100;
let SW = 2;

function setup() {
	createCanvas(540, 540);
}

function draw() {
	background(clrs[0]);
	translate(width / 2, height / 2);
	goldenRect(-d, -d, d, -d, d, d, -d, d, 1, 4);
	noLoop();
}

function goldenRect(x1, y1, x2, y2, x3, y3, x4, y4, stage, maxStage) {
	let mid = (x3 + x4) / 2;
	let a = createVector(mid, y3);
	let b = createVector(x2, y2);
	let r = sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
	if (stage % 2 == 0) {
		mid = x3;
		a = createVector(mid, (y3 + y4) / 2);
		b = createVector(x2, y2);
		r = sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
	}

	stroke(clrs[1]);
	strokeWeight(SW);
	noFill();

	ellipse(a.x, a.y, r * 2, r * 2);
	line(a.x, a.y, b.x, b.y);

	beginShape();
	vertex(x1, y1);
	vertex(x2, y2);
	vertex(x3, y3);
	vertex(x4, y4);
	endShape(CLOSE);

	// beginShape();
	// vertex(x2, y2);
	// vertex(r, y2);
	// vertex(r, y3);
	// vertex(x3, y4);
	// endShape(CLOSE);
	if (stage < maxStage) {
		stage++;
		if (stage % 2 == 0) {
			x1 = x2 = x3;
			y1 = y4 = y3;
			y2 = y3 = y3 - abs(r - abs(x3 - a.x));
			x3 = x4 = r;
		} else {
			x1 = x4 = x3;
			y1 = y2 = y3;
			x2 = x3 = x3 - abs(r - abs(y3-a.y));
			y3 = y4 = a.y - r;
		}
		goldenRect(x1, y1, x2, y2, x3, y3, x4, y4, stage, maxStage)
		// goldenRect(x3, y3, x3, y3 - abs(r - x3), r, y3 - abs(r - x3), r, y3, stage, maxStage);
	}
}