let clrs = [250, 5, [85,0,255]];
let SW = 1;

let attractors = [];
let particles = [];
let totalParticles = 2500;
let totalAttractors = 2;

function setup() {
	createCanvas(600, 600);
	pixelDensity(2);
	background(clrs[0]);
	for (let i = 0; i < totalAttractors; i++) {
		let a = new Particle(random(width), random(height), 8, 255, random(1) > 0);
		attractors.push(a);
	}
	for (let i = 0; i < totalParticles; i++) {
		let p = new Particle(random(width), random(height));
		particles.push(p);
	}
}

function draw() {
	
	// attractors.forEach(elm => {
	// 	elm.show();
	// })

	particles.forEach(elm => {
		elm.show();
		elm.update();
		attractors.forEach(target => {
			elm.attracted(target);
		})
	})
}

function mousePressed() {
  save(`img${frameCount}.png`);
}