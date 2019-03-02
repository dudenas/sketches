let clrs = {
	'bg': [250, 250, 250],
	'main': [5, 5, 5]
}

function setup() {
	//createCanvas(800, 600, P2D);
	noCanvas();
	console.log('running');
	// drawData();

	select('#submit').mousePressed(() => {
		let word = select('#word').value();
		let score = select('#score').value();
		console.log(word, score);
		loadJSON(`add/${word}/${score}`, (data) => {
			console.log(data);
			//drawData();
		});
	});

	select('#analyze').mousePressed(() => {
		let txt = select('#input').value();
		let data = {
			text: txt
		}
		httpPost('analyze/', data, 'json', dataPosted, postError);

		function dataPosted(result) {
			console.log(result);
		}

		function postError(err) {
			console.error(err);
		}
	});
}

// draw Data
// function drawData() {
// 	background(color(clrs['bg']));
// 	loadJSON('/all', gotData);
// }

// function gotData(data) {
// 	let keys = Object.keys(data);
// 	keys.forEach((word) => {
// 		let score = data[word];
// 		let x = random(width);
// 		let y = random(height);
// 		noStroke();
// 		fill(color(clrs['main']));
// 		textSize(map(score, 0, 10, 10, 20));
// 		text(word, x, y);
// 	});
// }