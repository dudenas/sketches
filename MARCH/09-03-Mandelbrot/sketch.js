let iter = 400;

function setup() {
	createCanvas(800, 800);
	pixelDensity(1);
	loadPixels();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			let a = map(x, 0, width, -2, 2);
			let b = map(y, 0, height, -2, 2);

			let ca = a;
			let cb = b;

			let n = 0;
			let z = 0;
			while (n < iter) {
				let aa = a * a - b * b;
				let bb = 2 * a * b;

				a = aa + ca;
				b = bb + cb;

				if (abs(a + b) > 16) {
					break;
				}
				n++;
			}

			let bright = map(n, 0, iter, 0, 1);
			bright = map(sqrt(bright), 0, 1, 0, 255);

			if (n == iter) {
				bright = 0;
			}

			let index = (x + y * width) * 4;
			pixels[index + 0] = bright;
			pixels[index + 1] = bright;
			pixels[index + 2] = bright;
			pixels[index + 3] = 255;
		}
	}
	updatePixels();
}

function draw() {

}