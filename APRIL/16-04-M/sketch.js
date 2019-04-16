let clrs = [5, 250];
let xlen = 100;
let ylen = 100;
let SW = 4;
let x1, x2, x3, y1, y2, y3, x, y;

let song, fft, bass, mid, treble;

//————————————————————————————————————————————————————————————————————————————————— setup song
function preload() {
	song = loadSound('data/Shkema & Wolg - Caravan.mp3', () => {
		song.loop();
		song.jump(30);
		fft = new p5.FFT();
	});
}

//————————————————————————————————————————————————————————————————————————————————— setup
function setup() {
	createCanvas(540, 540);
	strokeCap(PROJECT);
	setValues();
	gridSetup();
	frameRate(30);
}

//————————————————————————————————————————————————————————————————————————————————— draw
function draw() {
	background(clrs[0]);
	fft.analyze();
	bass = fft.getEnergy("bass");
	mid = fft.getEnergy("mid");
	treble = fft.getEnergy("treble");

	for (let g of grfc) {
		g.update();
		g.show();
	}
}

//————————————————————————————————————————————————————————————————————————————————— help functions
function setValues() {
	xlen /= scl;
	ylen /= scl;

	x1 = xlen;
	x2 = 0;
	x3 = -xlen;
	y1 = ylen;
	y2 = 0;
	y3 = -ylen;
	x = width / 2;
	y = height / 2;
}