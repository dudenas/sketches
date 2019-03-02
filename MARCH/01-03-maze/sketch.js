let clrs;
let SW;
let cols, rows, scl;
let cells;
let current;
let stack = [];

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
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			cells.push(new Cell(i, j));
		}
	}

	current = cells[0];
	//frameRate(120);
	noLoop();
}

//————————————————————————————————————————————————draw
function draw() {
	background(clrs['bg']);
	for (let c of cells) {
		c.show();
	}

	current.visited = true;
	current.highlight();
	// STEP 1
	let next = current.checkNeighbors();
	if (next) {
		next.visited = true;

		// STEP 2
		stack.push(current);

		// STEP 3
		removeWalls(current, next);

		// STEP 4
		current = next;
	} else if (stack.length > 0) {
		current = stack.pop();
	};
}

//————————————————————————————————————————————————

function removeWalls(a, b) {
	let x = a.x - b.x;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	let y = a.y - b.y;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}