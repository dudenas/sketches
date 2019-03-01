let clrs;
let SW;
let cols, rows, scl;
let cells;
let current;

//————————————————————————————————————————————————setup
function setup() {
	createCanvas(400, 400);

	// setup variables
	clrs = {
		'bg': color(250, 250, 250),
		'main': color(5, 5, 5),
		'sub': color(85, 0, 255)
	}

	SW = 2;

	scl = 20;
	cols = floor(width / scl);
	rows = floor(height / scl);

	cells = [];
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			cells.push(new Cell(i, j));
		}
	}

	current = cells[0];
}

//————————————————————————————————————————————————draw
function draw() {
	background(clrs['bg']);
	for (let c of cells) {
		c.show();
	}

	current.visited = true;
	current.checkNeighbors();
}

//————————————————————————————————————————————————