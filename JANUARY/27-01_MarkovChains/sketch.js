let txt;
let beginnings = [];
let shakespeare;

let order = 3;
let ngrams = {};
let button;

function preload() {
	shakespeare = loadStrings('shakespeare.txt');
}

function setup() {
	noCanvas();
	// shakespeare = txt.join('\n');

	for (let j = 0; j < shakespeare.length; j++) {
		txt = shakespeare[j];
		for (let i = 0; i <= txt.length - order; i++) {
			let gram = txt.substring(i, i + order);
			if (i == 0) beginnings.push(gram);
			if (!ngrams[gram]) ngrams[gram] = [];
			ngrams[gram].push(txt.charAt(i + order));
		}
	}

	button = createButton('generate');
	button.mousePressed(markovIt);

	// let original = txt.substring(0, 100);
	// createP(original);
}

function markovIt() {
	// let currentGram = txt.substring(0, order);
	let currentGram = random(beginnings);
	let result = currentGram;

	for (let i = 0; i < 100; i++) {
		let possibilities = ngrams[currentGram];
		if (!possibilities) break;
		let next = random(possibilities);
		result += next;
		let len = result.length;
		currentGram = result.substring(len - order, len);
	}
	createP(result);
}