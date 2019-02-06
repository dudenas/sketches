let num = 1;

function setup() {
	noCanvas();
	////////////////////////////////////////////////////////////
	let bot = new RiveScript();
	bot.loadFile("brain.rive").then(loading_done).catch((err) => console.error(err));

	function loading_done() {
		console.log('ChatBot ready');
		bot.sortReplies();
		let num = floor(random(100));
		console.log(num);
		bot.reply("local-user", `set ${num}`)
			.then((reply) => console.log(reply));
	}

	////////////////////////////////////////////////////////////
	let button = select('#submit');
	let user_input = select('#user_input');
	let output = select('#output');

	button.mousePressed(chat);

	function chat() {
		let input = user_input.value();
		bot.reply("local-user", input)
			.then((reply) => output.html(reply));
	}
}