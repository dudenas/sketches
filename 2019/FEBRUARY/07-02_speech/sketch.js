let speech;

function setup() {
	createCanvas(400, 400, P2D);

	speech = new p5.Speech();
	speech.onLoad = (() => console.log(speech.voices));
	speech.started(() => {
		background(5)
	});
	speech.ended(() => {
		background(255)
	});
}

function mousePressed() {
	//let voices = speech.voices;
	//let voice = random(voices);
	//speech.setVoice(voice.name);
	speech.setRate(0.75);
	speech.setPitch(0.1);
	speech.setVoice('Google US English');
	speech.speak('murama art');
}