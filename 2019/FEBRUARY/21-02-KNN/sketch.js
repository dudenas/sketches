let clrs = {
	'bg': (250, 250, 250),
	'main': (5, 5, 5)
};

let video;
let features;
let knn;
let labelP;

function modelReady() {
	console.log('model is ready');
}

function setup() {
	createCanvas(320, 250);
	background(color(clrs['bg']));
	// create video stream
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();

	labelP = createP('need training data, press l for left r for right');

	// add features and knn
	features = ml5.featureExtractor('MobileNet', modelReady);
	knn = ml5.KNNClassifier();
}

function keyPressed() {
	const logits = features.infer(video);
	if (key == 'L') knn.addExample(logits, "left");
	if (key == 'R') knn.addExample(logits, "right");
	// console.log(logist.dataSync());
	// logist.print();
}

function draw() {
	// draw the video
	image(video, 0, 0);

	if (knn.getNumLabels() > 0) {
		goClassify();
	}
}

function goClassify() {
	const logits = features.infer(video);
	knn.classify(logits)
		.then(
			(result) => labelP.html(result.label),
			(err) => console.error(err)
		);
}