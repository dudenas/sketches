let srcTxt, words;

function preload() {
	srcTxt = loadStrings('data/srcTxt.txt');
}

function diastic(seed, words) {
	let phrase = '';
	let currWord = 0;
	for (let i = 0; i < seed.length; i++) {
		let c = seed.charAt(i);
		for(let j = currWord; j < words.length; j++){
			if (words[j].charAt(i) == c) {
				phrase += words[j] + ' ';
				currWord = j + 1;
				break;
			}
		}
	}
	return phrase;
}

function setup() {
	noCanvas();
	srcTxt = join(srcTxt, ' ');
	words = splitTokens(srcTxt, ' !?,.');
	let seed = select('#seed');
	let submit = select('#submit');
	submit.mousePressed(() => {
		let phrase = diastic(seed.value(), words);
		createP(phrase);
	});
}

function draw() {

}