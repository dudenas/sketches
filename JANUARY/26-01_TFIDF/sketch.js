let txt;
let counts;
let keys;

let files;
let allWords;

function preload() {
	files = [];
	txt = [];
	// get file names to an array
	for (let i = 0; i < 8; i++) {
		files.push(`text${i+1}.txt`);
	}
	// load files
	files.forEach((file, index) => {
		txt[index] = loadStrings(`files/${files[index]}`);
	})
}

function setup() {
	noCanvas();
	counts = {};
	keys = [];
	allWords = [];
	// make the text from object to string
	txt.forEach((file, index) => {
		allWords[index] = txt[index].join('\n');
	})
	let regex = /\W+/;
	// split to individual words
	const tokens = allWords[0].split(regex);

	tokens.forEach((word, index) => {
		regex = /\d+/;
		// if it is not a digist add to counts
		if (!regex.test(counts[word])) {
			// make it a lowercase
			word = word.toLowerCase();
			// if there is a word incr counter, else add it
			counts[word] ?
				counts[word].tf++ :
				(
					counts[word] = {
						tf: 1,
						df: 1
					}
				);
		}
	});
	// other way to add keys to the object
	keys = Object.keys(counts);

	let otherCounts = [];
	for (let j = 1; j < allWords.length; j++) {
		let tempCounts = {};
		let regex = /\W+/;
		let tokens = allWords[j].split(regex);
		tokens.forEach((wordTemp, k) => {
			let word_check = wordTemp.toLowerCase();
			tempCounts[word_check] === undefined ? tempCounts[word_check] = true : '';
		})
		otherCounts.push(tempCounts);
	}

	// loop through the keys 
	keys.forEach((word, i) => {
		otherCounts.forEach((tempCounts, i) => {
			if (tempCounts[word]) counts[word].df++;
		})
	})

	// sort keys by the count and create a div out of it
	keys.forEach(key => {
		let wordObj = counts[key];
		wordObj.tfidf = wordObj.tf * log(files.length / wordObj.df);
	})

	keys.sort((a, b) => counts[b].tfidf - counts[a].tfidf).forEach(key => {
		createDiv(`${key} — ${Math.round(counts[key].tfidf * 100)/100}`);
	})
}