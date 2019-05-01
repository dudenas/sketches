class Grfc {
  constructor(x, y, child) {
    this.x = x;
    this.y = y ? y : height / 2;
    this.y1 = this.y - len;
    this.y2 = this.y + len;
    this.ymid = (this.y1 + this.y2) / 2;
    this.len = len;
    this.clen = 100;
    this.sw = SW;
    if (!child) this.tree();
  }

  tree() {
    let padd = 250;
    let gu = new Grfc(this.x, this.y - padd, true);
    let gb = new Grfc(this.x, this.y + padd, true);
    grfc.push(gu);
    grfc.push(gb);
  }

  update() {
    let pos = createVector(this.x, this.ymid);
    let d = p5.Vector.dist(obj, pos);
    this.len = map(d, 0, width, len, len * 20);
    this.clen = map(abs(obj.x - this.x), 0, width, len, pow(len,0.9));
    this.sw = map(abs(obj.y - this.ymid), 0, height, SW, SW * 2);

    this.y1 = this.y - this.clen;
    this.y2 = this.y + this.clen;
    this.ymid = (this.y1 + this.y2) / 2;
  }

  show() {
    stroke(clrs[1]);
    strokeWeight(this.sw);
    noFill();
    line(this.x, this.y1, this.x, this.y2);
    curve(this.x - this.len, this.ymid, this.x, this.y1, this.x, this.y2, this.x - this.len, this.ymid);
  }
}

