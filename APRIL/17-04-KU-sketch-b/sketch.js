let clrs = [5, 250, '#ED5656', '#FECF19', '#7CEAD1'];
let scl = 20;
let cols, rows;
let cells;
let SW = 5;
let update = true;

//—————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(960, 540);
	strokeCap(SQUARE);
	dataSetup();
	cols = floor(width / scl);
	rows = floor(height / scl);
	console.log(cols, rows);
}

//—————————————————————————————————————————————————————— draw
function draw() {
	if (update) {
		grfcSetup();
		update = false;
	}
	background(clrs[0]);
	// dataDraw();
	
	for (let c of cells) {
		c.update();
		c.show();
	}
	dataDraw();
	// noLoop();
}

//—————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
	cells = [];
	day = month[DAY];
	for (let i = 0; i < cols; i++) {
		let special = floor(random(1, 4));
		let w = scl * special;
		let index = floor(map(i * scl, 0, width, 0, 95));
		let h = floor(map(day[index].value, 0, 2, rows, 0));
		cells.push(new Cell(i * scl, h * scl, w, scl, index));
		i += (special - 1);
	}
}