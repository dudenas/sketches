let txt = 'the theremin is theirs, ok? yes, it is. this is a theramin.'

let order = 6;
let ngrams = {};
let button;

function preload() {
	txt = loadStrings('shakespeare.txt');
}

function setup() {
	noCanvas();
	txt = txt.join('\n');

	for (let i = 0; i <= txt.length - order; i++) {
		let gram = txt.substring(i, i + order);
		if (!ngrams[gram]) ngrams[gram] = [];
		ngrams[gram].push(txt.charAt(i + order));
	}

	button = createButton('generate');
	button.mousePressed(markovIt);

	let original = txt.substring(0, 100);
	createP(original);
}

function markovIt() {
	let currentGram = txt.substring(0, order);
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