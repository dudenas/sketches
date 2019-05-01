let totalFrames = 60;
let grfc = [];
let ratio = 6;
let scl = 540 / ratio;
//————————————————————————————————————————————————————————————————————————————————— setupGraphics
function grfcSetup() {
  let rows = floor(height / ratio);
  for (let i = 0; i < rows; i++) {
    let obj = new Obj(xlen * 2, i * scl, i, y1, y2);
    grfc.push(obj);
  }
}

//————————————————————————————————————————————————————————————————————————————————— obj class
class Obj {
  constructor(x, y, i, y1, y2) {
    this.x = x;
    this.xo = x;
    this.y = y;
    this.i = i;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }
  //————————————————————————————————————————————————————————————————————————————————— update
  update() {
    let percent = ((frameCount + this.i * time) % totalFrames) / totalFrames;
    this.x2 = calcMove(sin(percent * TWO_PI), -1, 1, x2, width - (xlen * 3));
    this.x1 = calcMove(cos(percent * TWO_PI), 1, -1, x1, this.x2);
  }

  //————————————————————————————————————————————————————————————————————————————————— show
  show() {
    stroke(clrs[1]);
    strokeWeight(SW);
    noFill();
    push();
    translate(this.x, this.y);
    beginShape();
    vertex(this.x1, this.y1);
    vertex(this.x1, this.y2);
    vertex(this.x2, this.y1);
    vertex(this.x2, this.y2);
    endShape();
    pop();
  }
}

function calcMove(percent, start, finnish, from, to) {
  if (from > to) return constrain(map(percent, start, finnish, from, to), to, from);
  return constrain(map(percent, start, finnish, from, to), from, to);
}