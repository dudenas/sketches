let SW = 1.5;

let grfc = [];

function setup() {
	createCanvas(600, 600);
	let g = new Grfc(2, 3);
	grfc.push(g);

	if (save) {
		saveSetup();
	}
	// frameRate(30);
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