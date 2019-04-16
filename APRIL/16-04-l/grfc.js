let totalFrames = 75;

class Obj {
  constructor(x, y, index_x, index_y) {
    this.x = x;
    this.y = y;
    this.yo = y;
    this.index_x = index_x;
    this.index_y = index_y;
    this.y1 = y1;
  }

  update() {
    let percenta = ((frameCount + this.index_x * 10) % totalFrames) / totalFrames;
    let percentb = ((frameCount + this.index_y * 5) % totalFrames) / totalFrames;
    percenta = ease[styles[0]](percenta);
    this.y1 = map(cos(percenta * TWO_PI), -1, 1, y1, y2);
    this.y = map(sin(percentb * TWO_PI), -1, 1, this.yo, this.yo - ratio);

  }

  show() {
    noFill();
    stroke(clrs[1]);
    strokeWeight(SW);
    push();
    translate(this.x, this.y);
    // moving
    line(x1, this.y1, x2, this.y1);
    // main
    line(x1, y1, x1, y2);
    pop();
  }
}