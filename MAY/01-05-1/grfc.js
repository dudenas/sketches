let letters = [];
let SW = 2;
let padd, cols;
let scl = 18;
let len = 240;
let spacing = 8;
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
    this.sw = SW;
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.index) % (totalFrames)) / (totalFrames);
    // this.y = map(sin(percent * TWO_PI), -1, 1, this.yo, this.yo + 1);
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push();
    translate(this.x, this.y);
    stroke(clrs[1]);
    strokeWeight(this.sw);
    line(0, this.y1, 0, this.y2);
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