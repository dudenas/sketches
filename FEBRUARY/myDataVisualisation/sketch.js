let imgs = [];
let start = false;

function preload() {
	loadJSON('data/asado2.json', gotData);
}

function setup() {
	createCanvas(600, 600);
	background(5);
	if (start) {
		imageMode(CENTER);
		imgs.forEach(img => {
			image(img, random(width), random(height), img.width / 4, img.height / 4);
		})
	}
}

function gotData(data) {
	// console.log(data);
	let tempUrls = [];
	data.users.forEach(elm => {
		//console.log(elm.media);
		if (elm.media != -1) {
			let found = tempUrls != 0 ? tempUrls.some(url => {
				return url === elm.media;
			}) : false;
			if (!found) {
				imgs.push(loadImage(elm.media));
				tempUrls.push(elm.media);
			}
		}
	})
	start = true;
	console.log(imgs.length);
}