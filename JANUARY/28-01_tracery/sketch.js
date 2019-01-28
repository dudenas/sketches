const story = {
	"start": "#[hero:#character#]story#",
	"story": "A #adj# #hero.s# fights the #adj# monster. Go #hero.capitalize#, go!",
	"character": ["dragon", "unicorn", "rainbow"],
	"adj": ["dark", "sleepy", "quiet"]
}

let grammar;

function setup() {
	noCanvas();
	grammar = tracery.createGrammar(story);
	let result = grammar.flatten("#start#");
	console.log(result);
}