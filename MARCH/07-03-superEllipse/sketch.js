let totalPoints = 150;
let a = 200;
let b = 200;
let SW = 2

let grfc = [];

function setup() {
	createCanvas(600, 600);
	let g = new Grfc(0, 2);
	grfc.push(g);
	g = new Grfc(1, 4);
	grfc.push(g);
	g = new Grfc(2, 12);
	grfc.push(g);

	if (save) {
		saveSetup();
	}
}

function draw() {
	background(5);
	translate(width / 2, height / 2);
	for (let g of grfc) {
		g.show();
		g.update();
	}

	saveDraw();
}