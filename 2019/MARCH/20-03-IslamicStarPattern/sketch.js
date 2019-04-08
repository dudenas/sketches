let clrs = [250, 5, [85, 0, 255]];
let polys = [];

let deltaSlider, angleSlider;

//————————————————————————————————————————————— Setup
function setup() {
	createCanvas(600, 600);
	deltaSlider = createSlider(0, 25, 1, 1);
	angleSlider = createSlider(0, 90, 60, 1);
	let incr = 150;
	for (let x = 0; x < width; x += incr) {
		for (let y = 0; y < height; y += incr) {
			let poly = new Polygon();

			poly.addVertex(x, y);
			poly.addVertex(x + incr, y);
			poly.addVertex(x + incr, y + incr);
			poly.addVertex(x, y + incr);
			poly.close();
			polys.push(poly);
		}
	}
}
//————————————————————————————————————————————— Draw
function draw() {
	background(clrs[0]);
	angle = angleSlider.value();
	delta = deltaSlider.value();
	polys.forEach(elm => {
		elm.hankin();
		elm.show();
	})
}