let clrs;

let blob;

//————————————————————————————————————————————— setup
function setup() {
	clrs = {
		'bg': color(250, 250, 250),
		'main': color(5, 5, 5),
		'sub': color(85, 0, 250)
	}

	createCanvas(600, 600);
	blob = new Blob();
}

//————————————————————————————————————————————— draw
function draw() {
	background(clrs['bg']);
	translate(width / 2, height / 2);
	//blob.show();
	bezierEllipse(0,0,100,25);
}

//————————————————————————————————————————————— other