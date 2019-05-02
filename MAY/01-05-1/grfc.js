let letters = [];
let SW = 4;
let padd, cols;
let scl = 16;

let len = 225;
let spacing = 5;
let w = SW;
let yspacing = 100;
let total = 3;
/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, index) {
    this.x = x;
    this.y = height / 2;

    // original values
    this.xo = this.x;
    this.yo = this.y;

    this.y1 = -len;
    this.y2 = len;

    this.index = index;
    this.w = SW;
    this.picked = false;
    this.len = len;
    this.extrudeSetup();
  }
  //————————————————————————————————————————————————————————————————————————————————— Letter extrudeUpdate
  extrudeUpdate(percent) {
    this.ly1 = map(sin(percent * TWO_PI), -1, 1, this.olen, this.olen / 2);
    this.y3 = this.y1 + this.ly1 + this.yspacing;
    this.ly3 = map(cos(percent * TWO_PI), -1, 1, this.olen, this.olen * 2);
    this.y4 = this.y3 + this.ly3 + this.yspacing;
    this.ly4 = (this.y2 - this.y4);
    // this.y4 = map(sin(percent * TWO_PI), -1, 1, this.y4o, this.y5o);
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter extrudeSetup
  extrudeSetup() {
    this.yspacing = yspacing;
    this.olen = (2 * this.len - (total - 1) * this.yspacing) / total;
    this.ly1 = this.olen;
    this.y3 = this.y1 + this.ly1 + this.yspacing;
    this.ly3 = this.olen;
    this.y4 = this.y3 + this.ly3 + this.yspacing;
    this.ly4 = this.olen
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter extrudeShow
  extrudeShow() {
    noStroke();
    fill(clrs[1]);
    rect(0, this.y1, this.w, this.ly1, 100, 100);
    rect(0, this.y1, this.w, this.ly1 / 2);
    rect(0, this.y3, this.w, this.ly3, 100, 100);
    rect(0, this.y4, this.w, this.ly4, 100, 100);
    rect(0, this.y4 + 5, this.w, this.ly4 - 5);
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    this.y1 = -this.len;
    this.y2 = this.len;
    let percent = ((frameCount + this.index) % (totalFrames)) / (totalFrames);
    // percent = ease[styles[0]](percent);
    let percentb = ease[styles[0]](percent);
    this.x = map(cos(percentb * TWO_PI), -1, 1, this.xo, this.xo * 1.618);
    this.w = map(sin(percent * TWO_PI), -1, 1, SW, SW / 3 * 2);
    this.yspacing = map(sin(percent * TWO_PI), -1, 1, 1, yspacing);
    this.extrudeUpdate(percent);
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push();
    translate(this.x, this.y);
    stroke(clrs[1]);
    strokeWeight(SW);
    line(0, this.y1, 0, this.y2);
    // translate(0, 0.5);
    this.extrudeShow();
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
  scl = width / scl;
  cols = floor(width / scl);
  for (let i = 0; i < cols; i++) {
    let x = floor(i * spacing);
    letters.push(new Letter(x, i));
  }
}