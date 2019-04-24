let clrs = [5, 250, [255, 0, 85]];
let SW_1 = 2;
let SW_2 = 4;
let qt;
let myFont;
let ease, styles;

function preload() {
	myFont = loadFont('data/Silka-Bold.otf', () => console.log('font loaded'));
}

function setup() {
	createCanvas(540, 540);
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['quadraticInOut', 'elasticIn', 'doubleExponentialSigmoid', 'normalizedInverseErf', 'backIn', 'bounceIn'];

	// define font
	textFont(myFont);
	textAlign(CENTER, CENTER);

	// create qt
	let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
	qt = new QuadTree(boundary);

	saveSetup();
}

function draw() {
	background(clrs[0]);
	// create points and add them
	// if (mouseIsPressed) {
	// 	let p = new Point(mouseX, mouseY);
	// 	qt.insert(p)
	// }

	// show qt
	qt.render();

	//insert points
	moveCircle();

	//save
	saveDraw();
}

function moveCircle() {
	let percent = (frameCount % totalFrames) / totalFrames;
	percent = ease[styles[2]](percent);
	let percent_x = percent;
	let percent_y = percent; //ease[styles[0]](percent);
	let angle_x = map(percent_x, 1, 0, 0, TWO_PI);
	let angle_y = map(percent_y, 0, 1, 0, TWO_PI);
	let r = width / 3;
	let x = width / 2 + r * cos(angle_x);
	let y = height / 2 + r * sin(angle_y);
	stroke(clrs[1]);
	strokeWeight(SW_2);
	// point(x, y);
	let p = new Point(x, y);
	qt.insert(p)
}