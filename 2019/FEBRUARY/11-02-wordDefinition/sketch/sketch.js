function setup() {
	noCanvas();
	let bgpage = chrome.extension.getBackgroundPage();
	let word = bgpage.word;
	let api = 'edcd71e426b721150e90c02ced10a6948f32a9e20b930b14e';

	let url = `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${api}`
	let t = select('#title');
	t.html(word);
	t.style('font-size', '24px');

	loadJSON(url, (data) => {
		createP(data[0].text).style('font-size', '16px');
	});
}