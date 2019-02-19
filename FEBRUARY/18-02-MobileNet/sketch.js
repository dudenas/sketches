let clrs = {
	'bg': (250, 250, 250),
	'main': (5, 5, 5)
};

let mobilenet;
let art;

function modelReady() {
	console.log('model is ready');
	mobilenet.predict(art, (err, results) => {
		err ? console.error(err) :
			console.log(results);
		let label = results[0].className;
		let prob = results[0].probability;
		createP(label).style('color', '#7B06F7');
		createP(prob).style('color', '#7B06F7');
	});
}

function setup() {
	createCanvas(600, 400);
	background(color(clrs['bg']));
	art = createImg('images/stashke.jpg', () => {
		image(art, 0, 0, width, (width / art.width) * art.height);
	});
	art.hide();
	mobilenet = ml5.imageClassifier('MobileNet', modelReady);

}

function draw() {

}