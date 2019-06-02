let scl = 5;
let sides = [];
let SW = 18;
let padd;
let totalCircles = 6;

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Side
class Side {
  constructor(x, y, side) {
    this.x = x;
    this.side = side;

    this.r = width / 10;
    if (this.side == 0) {
      this.y = y - this.r;
    } else {
      this.y = y + this.r;
    }
    this.yo = y;

    this.sw = SW;
    this.ro = this.r;

    this.circles = [];

    this.circlesCreate();

    this.special = 0
  }
  //————————————————————————————————————————————————————————————————————————————————— Side createCircles
  circlesCreate() {
    for (let i = 0; i < totalCircles; i++) {
      this.circles.push(this.r / 2);
    }
  }

  //————————————————————————————————————————————————————————————————————————————————— Side update
  update() {
    let percent_o = ((frameCount) % (totalFrames)) / (totalFrames);
    let percent = ((frameCount + this.special) % (totalFrames)) / (totalFrames);
    percent = ease[styles[0]](percent);
    this.r = map(sin(percent * TWO_PI), -1, 1, this.ro, this.ro * 3);
    if (this.side == 0) {
      this.y = this.yo - this.r;
      this.special = map(sin(percent_o * TWO_PI), -1, 1, -12, 12);
    } else {
      this.y = this.yo + this.r;
      this.special = map(sin(percent_o * TWO_PI), -1, 1, 12, -12);
    }

    let temp = map(sin(percent * TWO_PI), -1, 1, 8, -8);
    for (let i = 0; i < this.circles.length; i++) {
      let percent_c = ((frameCount + (i * temp)) % (totalFrames)) / (totalFrames);
      this.circles[i] = map(cos(percent_c * TWO_PI), -1, 1, this.r, this.r / 4);
    }
  }
  //————————————————————————————————————————————————————————————————————————————————— Side show
  show() {
    push();
    translate(this.x, this.y);
    stroke(clrs[1]);
    strokeWeight(this.sw);
    noFill();
    ellipse(0, 0, this.r * 2);

    for (let i = 0; i < this.circles.length; i++) {
      let percent = ((frameCount) % (totalFrames)) / (totalFrames);
      let maxSW = map(sin(percent * TWO_PI), -1, 1, SW * 3, SW);
      let temp = map(i, 0, this.circles.length, 2, maxSW)
      strokeWeight(temp)
      ellipse(0, 0, this.circles[i] * 2)
    }
    pop();
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— grfcDraw
function grfcDraw() {
  for (let s of sides) {
    s.update();
    s.show();
  }
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  let side_a = new Side(0, 0, 0)
  sides.push(side_a)
  let side_b = new Side(0, 0, 1)
  sides.push(side_b)
}