// style
let clrs = [
	[50, 65, 185], 0, [255, 0, 85], 255
];

let alpha = 5;
let res = 1;

// debug
let fr;
let debug = false;

// interval
let interval = 1;
let intervalFrames = 1;

function sketch(p) {
	//—————————————————————————————————————————————————————— dataPreload
	p.preload = function () {
		if (p.type != 'HIDDEN') {
			data = p.loadJSON('data/data.json', p.gotData, JSON);

			p.gotData = function () {
				console.log('data loaded');
			}

			myFontEL = p.loadFont('data/Silka-ExtraLight.otf');
			myFontL = p.loadFont('data/Silka-Light.otf');
		}
	}

	//————————————————————————————————————————————————————————————————————————————————— setup
	p.setup = function () {
		// asign to canvas css
		if (p.type == 'HIDDEN') {
			p.createCanvas(800 * res, 500 * res);
			p.colorMode(p.HSB);
			p.pixelDensity(2);
			p.noLoop();
		} else {
			p.createCanvas(800, 500);
			p.pixelDensity(2);
			p.background(clrs[0][0], clrs[0][1], clrs[0][2]);
			p.background(clrs[1], 255);
			fieldSetup(p);
			dataSetup(p);
			// setup interface
			buttonsSetup(p);
		}
	}

	//————————————————————————————————————————————————————————————————————————————————— draw
	p.draw = function () {
		if (p.type != "HIDDEN") {
			// set interval for a wave and update it
			if (intervalFrames % interval == 0) {
				generateWave(p);
				interval = p.floor(p.map(currValue, 0, 2, 150, 25));
				intervalFrames = 0;
			}
			intervalFrames++;

			// // update data / field / particle
			dataUpdate(p);

			// // draw background
			p.bgDraw();

			// // debug information
			if (debug) {
				fieldDraw();
			}
			fieldUpdate();

			particlesUpdate(p);

			// interface update
			buttonUpdate(p);
		}
	}

	//————————————————————————————————————————————————————————————————————————————————— helpFunctions
	p.keyPressed = function () {
		if (p.key == ' ') {
			debug = !debug;
		}
	}


	//————————————————————————————————————————————————————————————————————————————————— helpFunctions
	p.bgDraw = function () {
		p.noStroke();
		p.fill(clrs[0][0], clrs[0][1], clrs[0][2], alpha);
		p.rect(0, 0, p.width, p.height);
	}

	p.save_canvas = function () {
		p.redraw();
		particlesSave(p);
		// p.save('test.svg');
		p.save('test.png');
		console.log('saved');
		// recreate
		let temp = svg.createSelect('hidden_canvas').remove();
		svg = new p5(sketch, "hidden_canvas");
		svg.type = "HIDDEN";
	}
}

cvs = new p5(sketch, "show_canvas");
cvs.type = "NORMAL";

svg = new p5(sketch, "hidden_canvas");
svg.type = "HIDDEN";
// 232 72 72
function particlesSave(p) {
	p.background(232, 72, 72);
	p.noStroke();
	for (let particle of particles) {
		p.blendMode(p.DARKEST);
		let r = particle.r;
		for (let i = 0; i < particle.path.length; i++) {
			let ind = particle.path[i];
			let temp = p.map(i, 0, particle.path.length, 0, 1)
			let alphaGrad = p.map(p.pow(temp, 6), 0, 1, 72, 0);
			let x = ind.x;
			let y = ind.y;
			p.fill(232, 72, alphaGrad);
			p.ellipse(x * res, y * res, r * res);
		}
	}
}