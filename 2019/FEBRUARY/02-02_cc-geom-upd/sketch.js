// main line variables
const TOTAL_MAIN = 12;
const TOTAL_SUPP = 3;
const TOTAL_LONERS = 5;
const maxDistX = 50;
const minPadd = 100;
const maxPadd = 400;
const pointRadius = 75;
const connectRadius = 125;
const maxConnections = 1;
const variance = 0.7;


// style variables
const SW = {
	'main': 3,
	'points': 4,
	'pmain': 1,
	'pmin': 0.5,
	'pmax': 2,
	'pointloner': 4,
	'lineloner': 1,
}

let clrs = {
	'main': [5, 5, 5],
	'bg': [250, 250, 250],
	'special': [85, 0, 255]
}

// main variables
let art;
let chosen = null;
let pressed = false;

function setup() {
	createCanvas(windowWidth, windowHeight);

	// create graphics
	generateArt();
}

function draw() {
	background(color(clrs['bg']));

	// show graphics
	art.showMainLine();
	art.showPoints();
	art.showSuppLines();
	art.connectMain();
	art.showLoners();
	if (pressed) art.animPoints();
	else if (random(1) > random(15)) {
		generateArt();
	}

}

// generate new graphics when the key is pressed
function generateArt() {
	art = new grfc(random(minPadd, maxPadd));
	chosen = art.pickWinner();
}

function mousePressed() {
	let d = dist(mouseX, mouseY, chosen.x1, chosen.y1);
	if (d < 25) {
		pressed = true;
	}
}