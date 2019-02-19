let clrs = {
	'bg': (250, 250, 250),
	'main': (5, 5, 5)
};

let label_HTML;

let mobilenet;
let art;
let classifier;
let artButton;
let notArtButton;
let trainButton;

function modelReady() {
	console.log('model is ready');
	// predict the result
	//mobilenet.predict(gotResults);
}

function artReady() {
	console.log('art is ready');
}

function gotResults(err, result) {
	if (err) console.error(err);
	else {
		let label = result;

		lable_HTML.html(label);
		// do it all the time
		classifier.classify(gotResults);
	}
}

function setup() {
	createCanvas(600, 400);
	background(color(clrs['bg']));
	// create HTML elements
	lable_HTML = createP('label').style('color', '#7B06F7');

	// add buttons that classifies when you press the button
	artButton = createButton('Art').mousePressed(() => {
		classifier.addImage('Art');
	});
	notArtButton = createButton('not Art').mousePressed(() => {
		classifier.addImage('not Art');
	});
	trainButton = createButton('train').mousePressed(() => {
		classifier.train((loss) => {
			if (loss == null) {
				console.log('training complete');
				classifier.classify(gotResults);
			} else console.log(loss);
		});
	});

	// create video stream
	art = createCapture(VIDEO);
	art.hide();

	// add model to the code
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(art, artReady);
}

function draw() {
	// draw the video
	image(art, 0, 0);
}