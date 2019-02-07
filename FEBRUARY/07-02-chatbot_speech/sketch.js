let num = 1;

function setup() {
	noCanvas();
	////////////////////////////////////////////////////////////
	let speech = new p5.Speech();
	let speechRec = new p5.SpeechRec('en-US', gotSpeech);
	let continious = true;
	let interim = false;
	speechRec.start(continious, interim);
	//speech.speak('hello');
	function gotSpeech() {
		if (speechRec.resultValue) {
			let input = speechRec.resultString;
			user_input.value(input);
			bot.reply("local-user", input)
				.then((reply) => {
					speech.speak(reply);
					output.html(reply);
				});
		}
	}

	////////////////////////////////////////////////////////////
	let bot = new RiveScript();
	bot.loadFile("brain.rive").then(loading_done).catch((err) => console.error(err));

	function loading_done() {
		console.log('ChatBot ready');
		bot.sortReplies();
	}

	////////////////////////////////////////////////////////////
	let button = select('#submit');
	let user_input = select('#user_input');
	let output = select('#output');

	button.mousePressed(chat);

	function chat() {
		let input = user_input.value();
		// bot.reply("local-user", input)
		// 	.then((reply) => {
		// 		speech.speak(reply);
		// 		output.html(reply);
		// 	});
	}
}