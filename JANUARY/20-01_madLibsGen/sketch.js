let data;
let txt = '$$Exclamation$$! they said $$Adverb$$ as they jumped into their $$Noun$$ and flew off with their  $$Adjective$$ $$PluralNoun$$'

function setup() {
	noCanvas();
	Tabletop.init({
		key: '15WyEmfu6B1UCzzqeacYnzI8lutrxF6uWvFDiSteBqTs',
		callback: gotData,
		simpleSheet: true
	})
	createButton('generate MadLib').mousePressed(generate);

}

function replacer(match, pos) {
	let entry = random(data);
	return entry[pos];
}

function generate() {
	//console.log('generate');
	let madLib = txt.replace(/\$\$(.*?)\$\$/g, replacer);
	createP(madLib);
}

function gotData(stuff, tabletop) {
	data = stuff;
}