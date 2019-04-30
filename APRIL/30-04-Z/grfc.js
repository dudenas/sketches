let letters = [];
let SW = 12;
let padd, rows;
let scl = 4;
let childrenCount = 12;
let dist = 0.4666;

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, index, child) {
    this.x = x;
    this.y = y;
    this.x1 = -scl / 2 + padd;
    this.x2 = scl / 2 - padd;
    this.y1 = -scl / 2 + padd;
    this.y2 = scl / 2 - padd;
    this.index = index;
    this.sw = SW;
    if (!child) this.children = this.createChildren();
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter createChildren
  createChildren() {
    let arr = [];
    let distX = scl * dist;
    let distY = (scl / 2.333) * dist;
    for (let i = 0; i < childrenCount; i++) {
      arr.push(new Letter(this.x + distX * i, this.y - distY * i, i, true));
    }
    return arr;
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.index * 4) % (totalFrames)) / (totalFrames);
    // percent = ease[styles[2]](percent);
    this.x1 = map(sin(percent * TWO_PI), -1, 1, padd - scl / 10, -scl / 2 + padd);
    this.x2 = map(sin(percent * TWO_PI), -1, 1, -padd + scl / 10, scl / 2 - padd);

  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push();
    translate(this.x, this.y);
    stroke(clrs[1]);
    strokeWeight(this.sw);
    noFill();
    beginShape();
    vertex(this.x1, this.y1);
    vertex(this.x2, this.y1);
    vertex(this.x1, this.y2);
    vertex(this.x2, this.y2);
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
    if (!l.child) {
      for (let c of l.children) {
        c.update();
        c.show();
      }
    }
  }
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  rows = scl * 2;
  padd = width / (scl * 5 / 4);
  scl = height / scl;
  for (let j = 0; j < rows; j++) {
    letters.push(new Letter(-scl / 2, j * scl + scl / 2, j));
  }
}