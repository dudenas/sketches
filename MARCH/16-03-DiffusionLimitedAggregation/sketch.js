let clrs;
let tree = [];
let walkers = [];
let r = 6;
let maxRadius = r;
let minRadius = 2;
let iterations = 500;
let totalWalkers = 50;
let totalTree = 1000;
let fpsParagraph, totalTreeParagraph;

let filename = 'img';
let filetype = 'png';

function setup() {
	clrs = {
		'bg': color(250, 250, 250),
		'main': color(85, 0, 250),
		'sub': color(5, 5, 5)
	}
	pixelDensity(2);

	createCanvas(600, 600);
	fpsParagraph = createP('');
	totalTreeParagraph = createP('');

	tree[0] = new Walker(width / 2, height / 2);
	for (let i = 0; i < totalWalkers; i++) {
		r *= 0.99;
		walkers.push(new Walker());
	}
}

function draw() {
	background(clrs['bg']);
	tree.forEach(elm => {
		elm.show();
	})

	walkers.forEach(elm => {
		elm.show();
	})

	for (let i = 0; i < iterations; i++) {
		walkers.forEach((elm, index) => {
			elm.walk();
			if (elm.checkStuck(tree)) {
				tree.push(elm);
				walkers.splice(index, 1);
			}
		})
	}
	if (totalTree > tree.length) {
		while (totalWalkers > walkers.length) {
			r *= 0.99;
			if (r < minRadius) r = maxRadius;
			walkers.push(new Walker());
		}
	} else if (walkers.length === 0) {
		save(filename, filetype);
		noLoop();
	}

	fpsParagraph.html(nf(frameRate(), 0, 1));
	totalTreeParagraph.html(tree.length);
}