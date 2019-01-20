let input, button;

function setup() {
	noCanvas();

	input = createInput('the quick brown fox jumps over the lazy dog');
	input.changed(process);
	input.size(300);

	button = createButton('submit');
	button.mousePressed(process);
}

function process() {
	let s = input.value(); // get the input value
	// let sentence = nlp(s).sentences(); // makes a sentence object
	//let output = sentence.toNegative().out('text'); // takes the sentence, makes the negative, spits it out
	// let output = '';
	// let terms = sentence.list[0].terms; // get the list of words object
	// for (let i = 0; i < terms.length; i++) {
	// 	let w = terms[i]; // extract the word object
	// 	let n = w.tags.Noun; // extract noun
	// 	let pn = w.tags.Pronoun; // extract pronoun
	// 	// let v = w.tags.Verb; // extract verb 
	// 	let word = w._text;
	// 	if (n && !pn) {
	// 		word = nlp(word).nouns().toPlural().list[0].terms[0]._text; // make a noun, does not work with it
	// 	}
	// 	output += w.whitespace.before + word; // get the whitespace before and text 
	// }
	// let output = nlp(output).nouns().toPlural().out('text');

	// shorter version
	let output = nlp(s).sentences().toFutureTense();
	output.list[0].terms.forEach(i => {
			if(i.tags.Noun){
				i._text = nlp(i._text).nouns().toPlural().out('text'); // change the individual word
			}
	});
	
	createP(output.out('text')); // creates paragraph of the output
}