let totalFrames = 150;

class kline {
  constructor(x1, x2, y1, y2, id, index, cx, cy) {
    this.x1 = x1 / scl;
    this.x2 = x2 / scl;
    this.x2temp = x2 / scl;
    this.y1 = y1 / scl;
    this.y2 = y2 / scl;
    this.y2temp = y2 / scl;
    this.id = id;
    this.theta = 0;
    this.index = index;
    this.cy = (height / 2) / scl + cy;
    this.cxTemp = cx;
    this.cx = (width / 2) / scl + cx;
  }

  update(r) {
    this.cx = (width / 2 - r) / scl + this.cxTemp;

    let percent = ((frameCount) % totalFrames) / totalFrames;
    let percent2 = ease[styles[0]](percent);
    if (this.id == id[1]) {
      let d = height / 2 - padd;
      let t = len / d;
      this.theta = rot(percent2, PI / 2 - atan(t));
    } else if (this.id == id[2]) {
      let d = height / 2 - padd;
      let t = len / d;
      this.theta = rot(percent2, -(PI / 2 - atan(t)));
    } else if (this.id == id[0]) {
      this.theta = rot(percent, -PI / 2);
    } else if (this.id == id[3]) {
      this.theta = rot(percent, (PI / 2));
    }
    this.x2 = trimPath(percent, this.x2temp, 5);
    this.y2 = trimPath(percent, this.y2temp, 5);
  }

  show(masterTheta) {
    stroke(clrs[1]);
    strokeWeight(SW);
    noFill();
    push();
    translate(this.cx, this.cy);
    rotate(this.theta + masterTheta);
    beginShape();
    vertex(this.x1, this.y1);
    vertex(this.x2, this.y2);
    endShape();
    pop();
  }
}

function rot(percent, angle) {
  return map(sin(percent * TWO_PI), -1, 1, 0, angle);
}

function trimPath(percent, value, ratio) {
  return map(sin(percent * TWO_PI), 1, -1, value / ratio, value);
}