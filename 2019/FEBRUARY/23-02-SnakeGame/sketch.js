let clrs = {
	'bg': [250, 250, 250],
	'main': [5, 5, 5],
	'food': [85, 0, 255]
}

let scl;
let cols, rows;
let SW;
let snake;
let directions;
let direction;
let food;

//////////////////////////////////////////////////////////////////////////////////////////
function setupVariables() {
	scl = 20;
	cols = floor(width / scl);
	rows = floor(height / scl);
	SW = 2;
	directions = ["LEFT", "UP", "RIGHT", "DOWN"];
	direction = random(directions);
	frameRate(8);
}

//////////////////////////////////////////////////////////////////////////////////////////
function setup() {
	createCanvas(400, 400);
	setupVariables();
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			stroke(color(clrs['main']));
			strokeWeight(SW);
			noFill();
			rect(i * scl, j * scl, scl, scl);
		}
	}
	let pos = new p5.Vector(cols / 2, rows / 2);
	snake = new Snake(pos);
	food = [];
	addFodd();
}

//////////////////////////////////////////////////////////////////////////////////////////
function draw() {
	background(color(clrs['bg']));


	for (let i = food.length - 1; i >= 0; i--) {
		let f = food[i];
		if (f.eaten) {
			food.splice(i, 1);
			addFodd();
		} else {
			f.display();
		}
	}

	snake.display();
	snake.update();
}