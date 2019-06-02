let letters = [];
let SW = 2;
let padd, rows, cols;
let scl = 124;
/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, index, r) {
    this.x = x;
    this.y = y;
    this.xo = x;
    this.yo = y;

    this.index = index;
    this.sw = SW;
    this.r = (scl - padd) * r;
    this.ro = this.r;
    this.on = true;
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter getPixel
  getVideoValue() {
    const i = floor(this.x + (this.y * width));
    const darkness = video.pixels[i * 4];
    if (darkness > 1) this.on = true;
    else this.on = false;
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = ((frameCount + this.index) % (totalFrames)) / (totalFrames);
    // this.y = map(sin(percent * TWO_PI), -1, 1, this.yo, this.yo + 1);
    this.r = map(sin(percent * TWO_PI), -1, 1, this.ro, this.ro / 2);
    this.getVideoValue();
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    push();
    translate(this.x, this.y);
    // stroke(clrs[1]);
    // strokeWeight(this.sw);
    noStroke();
    noFill();
    if (this.on) fill(clrs[1]);
    ellipseMode(CENTER);
    ellipse(0, -this.r / 4, this.r);
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
  padd = width / (scl * 3);
  scl = width / scl;
  rows = floor(height / scl);
  cols = floor(width / scl);
  let amount = 1;
  for (let j = 0; j < rows; j += amount) {
    for (let i = 0; i < cols; i += amount) {
      let x = floor(i * scl + scl / 2);
      let y = floor(j * scl + scl / 2);
      letters.push(new Letter(x, y, i + j * cols, amount));
    }
    amount = int(random(1, 4));
  }


  // let j = scl / 4;
  // for (let i = 0; i < rows * cols; i++) {
  //   if (i % cols == 0) {
  //     j++;
  //   }
  //   let x = (i % cols) * scl / 2 + scl / 4;
  //   let y = j * scl / 2;
  //   letters.push(new Letter(x, y, i + j * cols));
  // }
}