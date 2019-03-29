let API = 'edcd71e426b721150e90c02ced10a6948f32a9e20b930b14e';
let url_0 = 'https://';
let url_1 = 'api.wordnik.com/v4/words.json/search/';
let url_2 = '?caseSensitive=false&limit=10&api_key=';


function setup() {
	noCanvas();
	let button = select('#submit');
	let input = select('#input');

	button.mousePressed(makeAcrostic);

	function makeAcrostic() {
		let word = input.value();
		for (let i = 0; i < word.length; i++) {
			let letter = word.charAt(i);
			div = createDiv(letter).parent('#container');
			pickWord(div, letter);
		}
	}

	function pickWord(div, letter) {
		let url = url_0 + url_1 + letter + url_2 + API;
		loadJSON(url,gotData);

		function gotData(data) {
			let options = data.searchResults;
			let selection = random(options);
			div.html(selection.word);
			console.log(selection.word);
		}
	}
}

function draw() {

}