let clrs = [
	250,
	5
];

let SW = 1;
let r = 15;
let k = 30;
let grid = [];
let active = [];
let ordered = [];
let scl = r / Math.sqrt(2);
let cols, rows;

function setup() {
	createCanvas(600, 600);
	pixelDensity(2);
	background(clrs[0]);

	clrs[2] = color(85, 0, 255);

	// STEP 0
	cols = floor(width / scl);
	rows = floor(height / scl);

	stroke(clrs[1]);
	strokeWeight(SW);
	for (let i = 0; i < cols * rows; i++) {
		grid[i] = undefined;
	}

	// STEP 1
	let x = width / 2;
	let y = height / 2;
	let i = floor(x / scl);
	let j = floor(y / scl);
	let pos = createVector(x, y);
	grid[i + j * cols] = pos;
	active.push(pos);
}

function draw() {
	background(clrs[0]);

	// STEP 2
	while (active.length > 0) {
		let index = floor(random(active.length));
		let pos = active[index];
		let found = false;
		for (let n = 0; n < k; n++) {
			let sample = p5.Vector.random2D();
			let mag = random(r, 2 * r);
			sample.setMag(mag);
			sample.add(pos);
			let col = floor(sample.x / scl);
			let row = floor(sample.y / scl);

			if (col < cols && row < rows &&
				col >= 0 && row >= 0 &&
				!grid[col + row * cols]) {
				let ok = true;
				for (i = -1; i <= 1; i++) {
					for (j = -1; j <= 1; j++) {
						let nIndex = (col + i) + (row + j) * cols;
						let neighbor = grid[nIndex];
						if (neighbor) {
							let d = p5.Vector.dist(sample, neighbor);
							if (d < r) {
								ok = false;
							}
						}
					}
				}
				if (ok) {
					found = true;
					grid[col + row * cols] = sample;
					active.push(sample);
					ordered.push(sample);
					break;
				}
			}
		}
		if (!found) {
			active.splice(index, 1);
		}
	}

	stroke(clrs[1]);
	strokeWeight(SW);
	noFill();
	for (let i = 0; i < ordered.length; i++) {
		let elm_a = ordered[i];
		// let elm_b = ordered[ordered.length - 1 - i];
		let elm_b = ordered[floor(ordered.length / 2)];
		let x1 = elm_a.x;//elm_a.x;
		let y1 = elm_a.y;//elm_a.x;
		let x4 = elm_b.x;//elm_b.x;
		let y4 = elm_b.y;//elm_b.x;
		// let x2 = (x1 + x4) / 2;
		// let y2 = y4;
		// let x3 = (x1 + x4) / 2;
		// let y3 = y1;
		let x2 = x4
		let y2 = y1;
		let x3 = x1;
		let y3 = y4;
		stroke(clrs[0]);
		strokeWeight(SW * 4);
		bezier(x1, y1, x2, y2, x3, y3, x4, y4);

		stroke(clrs[1]);
		strokeWeight(SW);
		bezier(x1, y1, x2, y2, x3, y3, x4, y4);

	}

	// grid.forEach((elm, index) => {
	// 	if (elm) {
	// 		point(elm.x, elm.y);
	// 	}
	// })

	// stroke(clrs[2]);
	// active.forEach((elm, index) => {
	// 	point(elm.x, elm.y);
	// })
}

function mousePressed(){
	saveCanvas();
}