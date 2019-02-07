function setup() {
	noCanvas();
	let lang = navigator.language || 'en-US';
	let speechRec = new p5.SpeechRec(lang, gotSpeech);
	
	let continious = true;
	let interim = true;

	speechRec.start(continious, interim);

	function gotSpeech() {
		if (speechRec.resultValue) {
			createP(speechRec.resultString);
		}
		//console.log(speechRec);
	}

}

function draw() {

}