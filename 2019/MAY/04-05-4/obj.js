let SW = 4;
let index = 0;

class Obj {
  constructor(x, y, dir) {
    this.dir = dir;
    this.index = index / 5;
    this.sw = SW;
    this.x = x;
    this.y = y;
    // this.special = floor(random(scl/2));
    this.special = 0;
    index++;
    this.newPick = true;
    if (this.dir == 1) {
      this.ax = this.x - scl;
      this.bx = this.x + scl;
      this.ay = this.y;
      this.by = this.y;
    } else {
      this.ax = this.x;
      this.bx = this.x;
      this.ay = this.y - scl;
      this.by = this.y + scl;
    }
  }

  interesctsPoints(x, y) {
    let found = false;
    for (let i = points.length - 1; i >= 0; i--) {
      let p = points[i];
      if (x == p.x && y == p.y) {
        found = true;
        points.splice(i, 1);
      }
    }
    return found;
  }

  intersects(x, y) {
    return ((this.ax == x && this.ay == y) || (this.bx == x && this.by == y));
  }

  checkA(others) {
    let available = true;
    for (let other of others) {
      if (this != other && other.intersects(this.ax, this.ay)) {
        available = false;
      }
    }
    if (available && this.interesctsPoints(this.ax, this.ay)) {
      return new Obj(this.ax, this.ay, this.dir * -1);
    } else return null;
  }

  checkB(others) {
    let available = true;
    for (let other of others) {
      if (this != other && other.intersects(this.bx, this.by)) {
        available = false;
      }
    }
    if (available && this.interesctsPoints(this.bx, this.by)) {
      return new Obj(this.bx, this.by, this.dir * -1);
    } else return null;
  }

  update() {
    let percent = ((frameCount + this.index) % totalFrames) / totalFrames;
    percent = ease[styles[3]](percent);
    if (this.dir == 1) {
      this.ax = map(sin(percent * TWO_PI), -1, 1, this.x, this.x - scl);
      this.bx = map(cos(percent * TWO_PI), -1, 1, this.x, this.x + scl);
      this.ay = this.y;
      this.by = this.y;

      this.px = map(sin(percent * TWO_PI), -1, 1, this.x - scl, this.x + scl);
      this.py = this.y;
    } else {
      this.ax = this.x;
      this.bx = this.x;
      this.ay = map(cos(percent * TWO_PI), -1, 1, this.y, this.y - scl + this.special);
      this.by = map(sin(percent * TWO_PI), -1, 1, this.y, this.y + scl - this.special);

      this.px = this.x;
      this.py = map(sin(percent * TWO_PI), -1, 1, this.y - scl, this.y + scl);
    }
    this.angle = map(sin(percent * TWO_PI), -1, 1, -PI / 12, PI / 12);
    this.sw = map(cos(percent * TWO_PI), -1, 1, SW / 2, SW);
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    translate(-this.x, -this.y);
    stroke(clrs[1]);
    strokeWeight(this.sw);
    line(this.ax, this.ay, this.bx, this.by);
    strokeWeight(SW);
    // point(this.px, this.py);
    // point(this.bx, this.by);
    pop();
  }
}