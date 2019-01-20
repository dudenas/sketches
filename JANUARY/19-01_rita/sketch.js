let input, button;
let lexicon;

function setup() {
	noCanvas();
	lexicon = new RiLexicon();
	input = createInput('it was a dark and stormy night');
	button = createButton('submit');
	button.mousePressed(processRita);
	input.size(300);
	input.changed(processRita);
}

function processRita() {
	let s = input.value();
	let rs = new RiString(s);
	let words = rs.words();
	let pos = rs.pos();
	let output = '';
	words.forEach((i, j) => {
		if (/nn.*/.test(pos[j])) {
			output += lexicon.randomWord(pos[j]) + ' ';
		} else {
			output += i + ' ';
		}
	});
	console.log(words, pos);
	createP(output);
}