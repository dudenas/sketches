let clrs = [5, 250, [85, 0, 255]];
let SW = 1;

let attractors = [];
let particles = [];
let totalParticles = 400;
let totalAttractors = 8;

function setup() {
	createCanvas(windowWidth, windowHeight);
	//pixelDensity(2);
	background(clrs[0]);
	setupGrfc();
}

function draw() {
	blendMode(HARD_LIGHT);
	// drawBg();
	if (random(1) > 0.5 && particles.length < totalParticles) {
		addParticle();
	}

	particles.forEach(elm => {
		elm.show();
		elm.update();
		attractors.forEach(target => {
			if (random(1) < (frameCount % 300) / 100) elm.attracted(target);
		})
	})

}

function mousePressed() {
	//save(`img${frameCount}.png`);
	setupGrfc();
}

function setupGrfc() {
	blendMode(NORMAL);
	background(clrs[0]);

	attractors = [];
	particles = [];
	for (let i = 0; i < totalAttractors; i++) {
		let a = new Particle(random(width), random(height), 8, 255, random(1) > 0.25);
		attractors.push(a);
	}
	for (let i = 0; i < totalParticles / 10; i++) {
		addParticle();
	}

	// attractors.forEach(elm => {
	// 	elm.show();
	// })
}

function drawBg() {
	noStroke();
	fill(clrs[0], random(0, 10));
	rect(0, 0, width, height);
}

function addParticle() {
	let p = new Particle(random(width), random(height));
	particles.push(p);
}