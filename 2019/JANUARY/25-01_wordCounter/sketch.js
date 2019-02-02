let txt;
let counts;
let keys;

function preload() {
	txt = loadStrings('text.txt');
}

function setup() {
	noCanvas();
	counts = {};
	keys = [];
	// make the text from object to string
	const allWords = txt.join('\n');
	let regex = /\W+/;
	// split to individual words
	const tokens = allWords.split(regex);

	tokens.forEach((word, index) => {
		regex = /\d+/;
		// if it is not a digist add to counts
		if (!regex.test(counts[word])) {
			// make it a lowercase
			word = word.toLowerCase();
			// if there is a word incr counter, else add it
			counts[word] ?
				counts[word]++ :
				(
					counts[word] = 1
					// one way to add keys
					// ,keys.push(word)
				);
		}
	});
	// other way to add keys to the object
	keys = Object.keys(counts);
	// sort keys by the count and create a div out of it
	keys.sort((a, b) => counts[b] - counts[a]).forEach(key => {
		createDiv(`${key} — ${counts[key]}`);
	})
}