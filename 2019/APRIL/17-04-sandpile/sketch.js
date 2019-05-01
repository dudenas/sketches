let clrs = [
	'#F4F4F4',
	5,
	'#044BF0', // blue
	'#FE4234', // red
	'#0E1618', // black

	'#FC89EF',
	5,
];
let SW = 0.1;
let totalTimes = 200;

function setup() {
	createCanvas(540, 540);
	pixelDensity(2);
	gridSetup();
}

function draw() {
	background(clrs[0]);
	cellDraw();
	for (let i = 0; i < totalTimes; i++) topple();

	if (finnished) {
		background(clrs[0]);
		blendMode(HARD_LIGHT);
		noFill();
		stroke(clrs[1]);
		strokeWeight(0.5);
		// beginShape();
		let first = [cols / 2, rows / 2];
		let second = 0;
		let min = Infinity;
		// find first point
		let found = false;
		// vertex(grid[first[0]][first[1]].x, grid[first[0]][first[1]].y);
		grid[first[0]][first[1]].drawn = true;
		grid[first[0]][first[1]].show();
		// draw everything
		let exitProgram = false
		while (!exitProgram) {
			let found = false;
			min = Infinity;
			grid.forEach((obj, i) => {
				obj.forEach((elm, j) => {

					let d = dist(elm.x, elm.y, grid[first[0]][first[1]].x, grid[first[0]][first[1]].y);
					if (d < min && !elm.drawn) {
						min = d;
						second = [i, j];
						found = true;
					};
				})
			})
			if (!found) exitProgram = true;
			else {
				first = second;
				// vertex(grid[first[0]][first[1]].x, grid[first[0]][first[1]].y);
				grid[first[0]][first[1]].r *= pow(random(1.5),3);
				// grid[first[0]][first[1]].r *= pow(random(1),3);
				grid[first[0]][first[1]].show();
				grid[first[0]][first[1]].drawn = true;
			}
		}
		// 	endShape();
		console.log('finnished');
		noLoop();
	}
}