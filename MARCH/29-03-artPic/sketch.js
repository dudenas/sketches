// image
let img;
let grid;
let imgData;
let loaded = false;

// canvas
let cols, ros;
let scl = 20;
let clrs = [250, 5, [85, 0, 255]];

//————————————————————————————————————————————— preload
function preload() {
	img = loadImage('data/pic.png', () => {
		loaded = true;
	});
}

//————————————————————————————————————————————— setup
function setup() {
	let size = 500;
	createCanvas(size * 2, size, P2D);
	pixelDensity(1);

	cols = floor(width / scl / 2);
	rows = floor(height / scl);
	// if loaded start the image process
	grid = make2Darray(cols, rows);
	if (loaded) {
		setupImage();
	}
}

//————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);

	showImage();
	letsPlaySomeMusic()
}

//————————————————————————————————————————————— helping functions
function make2Darray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}