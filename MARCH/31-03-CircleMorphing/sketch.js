let clrs = [250, 5];
let cirPath = [];
let triPath = [];
let spacing = 4;
let theta = 0;
let speed = 2;
let SW = 2;
let r = 150;
let cir = true;
let pcir = true;
let tri = true;
let transition = false;
let pamt = 0;
let index = 0;

function polarToCartesian(r, angle) {
	return createVector(r * cos(angle), r * sin(angle));
}

function setup() {
	createCanvas(540, 540);
	angleMode(DEGREES);
	saveSetup();
	let startA = 0;
	let endA = 120;
	let start = polarToCartesian(r, startA);
	let end = polarToCartesian(r, endA);
	for (let a = startA; a < 360; a += spacing) {
		let cv = polarToCartesian(r, a);
		cirPath.push(cv);
		let amt = (a % 120) / (endA - startA);
		let tv = p5.Vector.lerp(start, end, amt);
		triPath.push(tv);
		if ((a + spacing) % 120 === 0) {
			startA += 120;
			endA += 120;
			start = polarToCartesian(r, startA);
			end = polarToCartesian(r, endA);
		}
	}
}

function draw() {
	background(clrs[0]);
	translate(width / 2, height / 2);
	stroke(clrs[1]);
	strokeWeight(SW);
	noFill();
	beginShape();
	rotate(theta / 2);
	let amt = (sin(theta) + 1) / 2;
	theta += speed;
	cirPath.forEach((elm, index) => {
		let cv = cirPath[index];
		let tv = triPath[index];
		let x = lerp(cv.x, tv.x, amt);
		let y = lerp(cv.y, tv.y, amt);
		vertex(x, y);
	})
	endShape(CLOSE);

	if (amt - pamt > 0) cir = true;
	else cir = false;
	if (!tri) {
		beginShape();
		cirPath.forEach(elm => {
			vertex(elm.x, elm.y);
		})
		endShape(CLOSE);
	}
	if (transition) {
		beginShape();
		triPath.forEach(elm => {
			vertex(elm.x, elm.y);
		})
		endShape(CLOSE);
	}
	pamt = amt;

	if (pcir != cir) {
		index++;
		if (index % 2 == 0) {
			tri = !tri;
		}
	}
	if (tri) {
		if (amt == 1) transition = !transition;
	}
	pcir = cir;
	// if(amt == 0)console.log(frameCount); // 1036
	saveDraw();
}