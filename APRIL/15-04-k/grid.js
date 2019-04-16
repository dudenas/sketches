let scl = 12;
let ratio = 540 / scl;
let grfc = [];

function gridSetup() {
  cols = floor(width / ratio);
  rows = floor(height / ratio);
  let index = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(clrs[1]);
      let x = i * ratio;
      let y = j * ratio;

      grfc.push(new Grfc(index, x, y));
      index++;
    }
  }
};

class Grfc {
  constructor(index, x, y) {
    this.arr = setupGrfc(index, x, y);
    this.percent = 0;
    this.r = 0;
    this.masterTheta = 0;
    this.index = index*2;
  }

  update(){
    this.percent = ((frameCount + this.index) % totalFrames) / totalFrames;
    this.r = map(sin(this.percent * TWO_PI), -1, 1, 100, 0);
    this.percent = ease[styles[2]](this.percent);
    this.masterTheta = map(this.percent, 0, 1, 0, TWO_PI);
  }

  show() {
    for (let kl of this.arr) {
      kl.update(this.r);
      kl.show(this.masterTheta);
    }
  }
}