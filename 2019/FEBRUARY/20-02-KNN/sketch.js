let clrs = {
	'bg': (250, 250, 250),
	'main': (5, 5, 5)
};

let video;
let features;

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

	// add model to the code
	features = ml5.featureExtractor('MobileNet', modelReady);
}

function mousePressed() {
	const logist = features.infer(video);
	console.log(logist.dataSync());
	// logist.print();
}

function draw() {
	// draw the video
	image(video, 0, 0);
}