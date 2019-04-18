let clrs = [5, 250, '#ED5656', '#FECF19', '#7CEAD1'];
let scl = 40;
let cols, rows;
let cells;
let SW = 5;
let update = true;
let sclSlider;

//—————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(960, 540);
	strokeCap(SQUARE);
	dataSetup();
	sclSlider = createSlider(10, 80, 40);
	sclSlider.position(40, height - 40);
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

	// update scl value by the slider
	fill(clrs[1]);
	text(sclSlider.value(), 20, height - 35);
	scl = sclSlider.value();
}

//—————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
	cols = floor(width / scl);
	rows = floor(height / scl);
	console.log(cols, rows);

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