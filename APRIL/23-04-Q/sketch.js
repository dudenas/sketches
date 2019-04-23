let clrs = [5, 250, [255, 0, 85]];
let points = [];
let SW_1 = 2;
let SW_2 = 4;
let qt;

function setup() {
	createCanvas(540, 540);
	background(clrs[0]);
	// create qt
	let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
	qt = new QuadTree(boundary);

	// create points and add them
	for (let i = 0; i < 100; i++) {
		let p = new Point(random(width), random(height));
		points.push(p);
		qt.insert(p)
	}

	// show points
	for (let p of points) {
		p.show();
	}

	// show qt
	qt.show();
}

// function draw() {
// 	background(clrs[0]);
// }