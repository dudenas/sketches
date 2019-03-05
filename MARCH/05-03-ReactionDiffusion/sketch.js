let clrs;
let grid, next;
let dA = 1;
let dB = 0.5;
let feed = 0.055;
let k = 0.062;
let speed = 1;


function setupVariables() {
	// setup variables
	clrs = {
		'bg': [5, 5, 5],
		'main': [250, 250, 250],
		'sub': [85, 0, 255]
	}

	// create a two dimensional grid
	grid = [];
	next = [];
	for (let x = 0; x < width; x++) {
		grid[x] = [];
		next[x] = [];
		for (let y = 0; y < height; y++) {
			grid[x][y] = {
				a: 1,
				b: 0
			};
			next[x][y] = {
				a: 1,
				b: 0
			};
		}
	}
	let d = 50;
	let start = floor(random(d, width - d));
	for (let i = start; i < start + d; i++) {
		for (let j = start; j < start + d; j++) {
			grid[i][j].b = 1;
		}
	}

}

function setup() {
	createCanvas(600, 600);
	setupVariables();
	pixelDensity(1);
	frameRate(30);
}

function draw() {
	for (let x = 1; x < width - 1; x++) {
		for (let y = 1; y < height - 1; y++) {
			let a = grid[x][y].a;
			let b = grid[x][y].b;
			next[x][y].a = a + (dA * (laplaceA(x, y)) - (a * b * b) + (feed * (1 - a))) * speed;
			next[x][y].b = b + (dB * (laplaceB(x, y)) + (a * b * b) - ((k + feed) * b)) * speed;
			next[x][y].a = constrain(next[x][y].a, 0, 1);
			next[x][y].b = constrain(next[x][y].b, 0, 1);
		}
	}

	loadPixels();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			let index = (x + y * width) * 4;
			let c = constrain(floor((next[x][y].a - next[x][y].b) * 255), 0, 255);
			pixels[index + 0] = c;
			pixels[index + 1] = c;
			pixels[index + 2] = c;
			pixels[index + 3] = 255;
		}
	}
	updatePixels();

	grid = next;
}

function laplaceA(x, y) {
	let sumA = 0;
	sumA += grid[x][y].a * -1;
	sumA += grid[x - 1][y].a * 0.2;
	sumA += grid[x + 1][y].a * 0.2;
	sumA += grid[x][y - 1].a * 0.2;
	sumA += grid[x][y + 1].a * 0.2;
	sumA += grid[x + 1][y + 1].a * 0.05;
	sumA += grid[x + 1][y - 1].a * 0.05;
	sumA += grid[x - 1][y - 1].a * 0.05;
	sumA += grid[x - 1][y + 1].a * 0.05;
	return sumA;
}

function laplaceB(x, y) {
	let sumB = 0;
	sumB += grid[x][y].b * -1;
	sumB += grid[x - 1][y].b * 0.2;
	sumB += grid[x + 1][y].b * 0.2;
	sumB += grid[x][y - 1].b * 0.2;
	sumB += grid[x][y + 1].b * 0.2;
	sumB += grid[x + 1][y + 1].b * 0.05;
	sumB += grid[x + 1][y - 1].b * 0.05;
	sumB += grid[x - 1][y - 1].b * 0.05;
	sumB += grid[x - 1][y + 1].b * 0.05;
	return sumB;
}