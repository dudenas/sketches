let clrs = {
	'bg': (250, 250, 250),
	'main': (5, 5, 5)
};

let value_HTML;
let value = 0;

let mobilenet;
let art;
let predictor;
let slider;
let addButton;
let trainButton;

function modelReady() {
	console.log('model is ready');
	predictor.load('model.json', () => {
		console.log('custom model is ready');
		predictor.predict(gotResults);
	});
}

function artReady() {
	console.log('art is ready');
}

function gotResults(err, result) {
	if (err) console.error(err);
	else {
		value = result;

		value_HTML.html(value);
		// do it all the time
		predictor.predict(gotResults);
	}
}

function setup() {
	createCanvas(600, 400);
	background(color(clrs['bg']));
	// create HTML elements
	value_HTML = createP('value').style('color', '#7B06F7');

	// slider = createSlider(0, 1, 0.5, 0.01);

	// addButton = createButton('add Example').mousePressed(() => {
	// 	console.log(`added Image — ${slider.value()}`);
	// 	predictor.addImage(slider.value());
	// });

	// trainButton = createButton('train').mousePressed(() => {
	// 	predictor.train((loss) => {
	// 		if (loss == null) {
	// 			console.log('training complete');
	// 			predictor.predict(gotResults);
	// 		} else console.log(loss);
	// 	});
	// });

	// createButton('save').mousePressed(() => {
	// 	console.log('save');
	// 	predictor.save();
	// })

	// create video stream
	art = createCapture(VIDEO);
	art.hide();

	// add model to the code
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	predictor = mobilenet.regression(art, artReady);
}

function draw() {
	// draw the video
	image(art, 0, 0);

	let x = map(value, 0, 1, 0, width);
	fill(5, 125);
	noStroke();
	rect(x, height / 2, 20, 20);
}