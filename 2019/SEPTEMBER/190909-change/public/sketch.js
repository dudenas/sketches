let socket;

let px, py;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background('#111');

	socket = io()
	socket.on('mouse', test)
}

function test(data) {
	stroke('#999');
	strokeWeight(4)
	noFill();
	point(data.x, data.y);
	console.log('test')
}

function draw() {
	stroke('#999');
	strokeWeight(1)
	noFill();
	if (px || py) line(px, py, mouseX, mouseY);
	px = mouseX;
	py = mouseY;
}

window.document.addEventListener('mousemove', e => {
	e.preventDefault()
	const data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit('mouse', data)
});