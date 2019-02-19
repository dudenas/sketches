let clrs = {
	'bg': (250, 250, 250),
	'main': (5, 5, 5)
};

let mobilenet;
let art;
let label_HTML;
let prob_HTML;

function modelReady() {
	console.log('model is ready');
	// predict the result
	mobilenet.predict(gotResults);
}

function gotResults(err, results) {
	if (err) console.error(err);
	else {
		let label = results[0].className;
		// console.log(results);

		let prob = results[0].probability;
		lable_HTML.html(label);
		prob_HTML.html(prob);
		// do it all the time
		mobilenet.predict(gotResults);
	}
}

function setup() {
	createCanvas(600, 400);
	background(color(clrs['bg']));
	// create HTML elements
	lable_HTML = createP('label').style('color', '#7B06F7');
	prob_HTML = createP('prob').style('color', '#7B06F7');

	// create video stream
	art = createCapture(VIDEO);
	art.hide();

	// add model to the code
	mobilenet = ml5.imageClassifier('MobileNet', art, modelReady);
}

function draw() {
	// draw the video
	image(art, 0, 0);
}