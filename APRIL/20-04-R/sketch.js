let clrs = [250, 5];
let SW = 24;
let r = 125;
let s = 100;
let s_2 = 35;
let angle = Math.PI / 2;
let angle_b = Math.PI / 6;
let angle_c = -Math.PI / 6;
let angle_d = Math.PI / 2;
let totalFrames = 250;

let ease, styles;

function setup() {
	createCanvas(540, 540);
	strokeCap(SQUARE);

	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticIn', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceIn'];

	saveSetup();
}

function draw() {
	background(clrs[0]);
	push();
	translate(width / 2, height / 2 - s_2);
	rotate(PI / 2);
	stroke(clrs[1]);
	strokeWeight(SW);
	noFill();
	ellipse(0, 0, r * 2, r * 2);
	let x1 = r * cos(angle);
	let y1 = r * sin(angle);
	let x2 = r * 2 * cos(angle_b);
	let y2 = r * 2 * sin(angle_b);
	let x3 = r * 2 * cos(angle_c);
	let y3 = r * 2 * sin(angle_c);
	let x4 = r * cos(angle_d);
	let y4 = r * sin(angle_d);
	line(x1, y1, x2, y2);
	line(x4, y4, x3, y3);
	line(x1, y1, x4, y4);
	pop();
	noStroke();
	fill(clrs[0]);
	rect(0, height - s, width, s);

	let percent = (frameCount % totalFrames) / totalFrames;
	let percenta = ease[styles[2]](percent);
	let percentb = ease[styles[0]](percenta);
	// angle = map(sin(percentb * TWO_PI), -1, 1, 0, TWO_PI);
	angle = map(percentb, 0, 1, Math.PI / 2, TWO_PI + Math.PI / 2);
	angle_d = map(percenta, 0, 1, -Math.PI / 6, TWO_PI - Math.PI / 6);

	saveDraw();
}