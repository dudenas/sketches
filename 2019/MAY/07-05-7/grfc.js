let rows, cols;
let scl = 5;
let letters = [];
let SW = 18;
let padd;

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, index) {
    this.x1 = -floor(scl / 2) + padd * 2;
    this.x2 = floor(scl / 2) - padd * 2;
    this.x3 = this.x1;
    this.x = x;
    this.xo = x;
    this.y1 = -floor(scl / 2) + padd;
    this.y2 = floor(scl / 2) - padd;
    this.y = y;
    this.yo = y;
    this.index = index;
    // this.index = 0;
    // this.index = index % 2 == 0 ? 2 : 3;
    this.angle = 0;
    console.log(this.x1, this.x2, padd);
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.index) % (totalFrames)) / (totalFrames);
    percent = ease[styles[2]](percent);
    // first part
    this.x3 = map(percent, 0, 0.5, this.x1, this.x2, true);
    // second part
    if (percent >= 0.5) {
      this.x3 = map(percent, 0.5, 1, this.x2, this.x1, true);
      if (this.index % 2 == 0) this.x = map(percent, 0.5, 1, this.xo, this.xo + scl, true);
      else this.x = map(percent, 0.5, 1, this.xo, this.xo - scl);
    }
    this.sw = map(this.yo, 0, height, 1, SW);
    this.angle = map(sin(percent * TWO_PI), -1, 1, -PI / 12, PI / 12);
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    stroke(clrs[1]);
    strokeWeight(this.sw);
    noFill();
    // rect(this.x1, this.y1, scl, scl);
    beginShape();
    vertex(this.x1, this.y1);
    vertex(this.x2, this.y1);
    vertex(this.x3, this.y2);
    endShape();
    pop();
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
  rows = scl;
  cols = scl;
  scl = floor(height / scl);
  padd = floor(scl / 10);
  console.log(SW);
  for (let i = 0; i < cols + 2; i++) {
    for (let j = 0; j < rows; j++) {
      letters.push(new Letter(i * scl - floor(scl / 2), j * scl + floor(scl / 2), i + j * rows));
    }
  }
}