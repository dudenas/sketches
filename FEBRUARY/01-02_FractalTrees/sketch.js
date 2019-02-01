let clrs = {
	main: (5, 5, 5),
	bg: (250, 250, 250)
}

let axiom = 'F';
let sentence = axiom;
let len = 60;
const SW = 1;
let angle;

let rules = [];
rules[0] = {
	a: 'F',
	b: 'FF+[+F-F-F]-[-F+F+F]'
};

function setup() {
	createCanvas(1000, 600);
	pixelDensity(2);
	angle = radians(25);

	createP(axiom);
	createButton('generate').mousePressed(generate);
	turtle();
}

function keyPressed(){
	let now = new Date();
	if (key == 'S') {
		console.log('saved');
		save(`output${now.getSeconds()}-${now.getMilliseconds()}.png`);
	}
}

// draw turtle graphics
function turtle() {
	background(color(clrs["bg"]));
	resetMatrix();
	translate(width / 2, height);
	strokeWeight(SW);
	stroke(color(clrs["main"], 75));
	for (let i = 0; i < sentence.length; i++) {
		random(1) > 0.1 ? angle = radians(random(15, 25)) : angle = radians(-random(1, 2));
		let curr = sentence.charAt(i);
		// instructions to go;
		switch (curr) {
			case "F":
				line(0, 0, 0, -len);
				translate(0, -len);
				break;
			case "+":
				rotate(angle);
				break;
			case "-":
				rotate(-angle);
				break;
			case "[":
				push();
				break;
			case "]":
				pop();
				break;
			default:
				console.log("something went wrong");
				break;
		}
	}
}

// generate the text
let count = 0;

function generate() {
	if (count <= 5) {
		len *= 1 / 1.618;
		let nextSentence = '';
		for (let i = 0; i < sentence.length; i++) {
			let curr = sentence.charAt(i);
			// check which rule it fits
			let found = false;
			for (let j = 0; j < rules.length; j++) {
				if (curr == rules[j].a) {
					// if it fits add to the sentence
					nextSentence += rules[j].b;
					found = true;
					break;
				}
			}
			// add curr to the sentence if none of the rules apply
			if (!found) nextSentence += curr;
		}
		// switch newsentence instead
		sentence = nextSentence;
		createP(sentence);
		turtle();
	} else {
		console.log('you reached the limits of the browser');
	}
	count++;
}