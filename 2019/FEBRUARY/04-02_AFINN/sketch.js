let afinn;

function preload() {
	afinn = loadJSON('data/afinb111.json');
}

function setup() {
	noCanvas();
	let txt = select('#txt');

	txt.input(() => {
		let textInput = txt.value();
		let regex = /\W/;
		let words = textInput.split(regex);
		let scoredWords = [];
		let totalScore = 0;
		//console.log(words);
		words.forEach(elm => {
			let word = elm.toLowerCase();
			if (afinn.hasOwnProperty(word)) {
				let score = afinn[word];
				totalScore += Number(score);
				scoredWords.push(` ${word} : ${score}`);

			}
		})

		select('#score')
			.html(`totalScore — ${totalScore}`);
		select('#comparative')
			.html(`comparative — ${totalScore / words.length}`);
		select('#wordlist')
			.html(scoredWords);
	});
}