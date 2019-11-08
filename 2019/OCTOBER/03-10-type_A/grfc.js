let letters = [];
let SW = 2;
let padd, rows, cols;
let scl = 32;
// let totalPoints = 200

/////////////5////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, i, j) {
    this.x = x
    this.xo = x
    this.y = y
    this.yo = y
    this.x1 = -scl / 2 + padd
    this.x2 = scl / 2 - padd
    this.x3 = 0
    this.x4 = 0
    this.y1 = -scl / 2 + padd
    this.y2 = scl / 2 - padd
    this.y3 = 0
    this.y4 = 0
    this.i = i
    this.j = j
    this.sw = SW
    this.up = i % 2 == 0
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.i * 2 + this.j * 2) % (totalFrames)) / (totalFrames);
    let percentb = ((frameCount + this.i * 2 + this.j * 2) % (totalFrames)) / (totalFrames);
    let percentc = ((frameCount + this.j * 4) % (totalFrames)) / (totalFrames);
    percent = ease[styles[0]](percent, 0.75);
    this.y = map(sin(percent * TWO_PI), -1, 1, this.yo - rows * scl, this.yo * 3 / 2);
    this.x3 = map(cos(percentb * TWO_PI), -1, 1, 0, this.x1 / 4 * 3);
    this.x4 = map(cos(percentc * TWO_PI), -1, 1, 0, this.x2 / 4 * 3);
    this.y3 = map(this.x3, 0, this.x1, this.y1, this.y2)
    this.y4 = map(this.x4, 0, this.x2, this.y1, this.y2)
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push()
    translate(this.x, this.y)
    if (!this.up) scale(1, -1)
    stroke(clrs[1])

    strokeWeight(1)
    noFill()
    // ellipse(0, 0, scl, scl)

    strokeWeight(this.sw)
    beginShape()
    vertex(this.x1, this.y2)
    vertex(0, this.y1)
    vertex(this.x2, this.y2)
    endShape()
    line(this.x3, this.y3, this.x4, this.y4)
    pop()
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— grfcDraw
function grfcDraw() {
  for (let l of letters) {
    l.update();
    l.show();
  }
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  rows = floor(scl / 3);
  cols = scl;
  padd = width / (scl);
  scl = floor(width / scl)
  for (let i = 0; i < cols; i++) {
    for (let j = rows; j < rows * 2; j++) {
      letters.push(new Letter(i * scl + scl / 2, j * scl - scl, i, j));
    }
  }
}

function keyPressed() {
  if (key == ' ') noLoop()
}