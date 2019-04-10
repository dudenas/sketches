let clrs = [250, 5];

let img;
let scl = 80;
let cols, rows;
let grid;
let myfont;
let pg;
let obj;

let totalFrames = 600;
let r = 450;

let ease, styles;

//————————————————————————————————————————————— preload
function preload() {
	img = loadImage("data/finger.png");
	myfont = loadFont("data/Silka-Bold.otf");
}

//————————————————————————————————————————————— setup
function setup() {
	createCanvas(1080, 1080);
	pixelDensity(1);
	ease = new p5.Ease();
	styles = ease.listAlgos();
	styles = ['elasticInOut', 'doubleExponentialSigmoid', 'normalizedInverseErf'];

	cols = floor(width / scl);
	rows = floor(height / scl);
	grid = make2Darray(cols, rows);

	img.resize(0, scl / 4 * 3);
	// create font image
	pg = createGraphics(width, height);
	pg.textSize(scl * 12);
	pg.textFont(myfont);
	pg.textAlign(CENTER, CENTER);
	pg.text("F", width / 2 - 45, height / 2 - 165);
	//image(pg, 0, 0);

	// take values from the font and apply to the grid
	pg.loadPixels();
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let index = (i * scl + j * scl * width) * 4;
			let c = pg.pixels[index + 3];
			let bright = brightness(c);
			if (bright > 10) {
				grid[i][j] = 1;
			} else {
				grid[i][j] = 0;
			}
		}
	}

	obj = createVector();
	saveSetup();
}

//————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			noFill();
			if (grid[i][j] == 1) {
				//fill(clrs[1]);
				let x = i * scl + scl / 2;
				let y = j * scl + scl / 2;
				push();
				translate(x, y);
				let pos = createVector(x, y);
				imageMode(CENTER);
				let diff = p5.Vector.sub(obj, pos);
				let angle = diff.heading();
				rotate(angle + PI / 2);
				image(img, 0, 0);
				pop();
			}
			stroke(clrs[1]);
			if (!save) rect(i * scl, j * scl, scl, scl);
		}
	}

	let percent = (frameCount % totalFrames) / totalFrames;
	let percent1 = ease[styles[1]](percent);
	obj.x = width / 2 + r * cos(map(sin(percent1 * TWO_PI), -1, 1, PI / 2, TWO_PI + PI / 2));
	obj.y = height / 2 + r * sin(map(sin(percent1 * TWO_PI), -1, 1, PI / 2, TWO_PI + PI / 2));
	if (!save) ellipse(obj.x, obj.y, 16, 16);
	saveDraw();
}

//————————————————————————————————————————————— helping functions
function make2Darray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}