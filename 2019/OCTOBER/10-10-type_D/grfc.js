class Grfc {
  constructor(x, y, padd, child) {
    this.x = x;
    this.xo = x;
    this.padd = padd;
    this.opadd = padd;
    this.y = y ? y : height / 2;
    this.y1 = this.y - len;
    this.y2 = this.y + len;
    this.ymid = (this.y1 + this.y2) / 2;
    this.len = len;
    this.clen = 100;
    this.sw = SW;
    this.child = child
    if (!child) this.tree();
  }

  tree() {
    let gu7 = new Grfc(this.x, this.y, -this.padd * 8, true);
    let gu6 = new Grfc(this.x, this.y, -this.padd * 7, true);
    let gu5 = new Grfc(this.x, this.y, -this.padd * 6, true);
    let gu1 = new Grfc(this.x, this.y, -this.padd * 5, true);
    let gu2 = new Grfc(this.x, this.y, -this.padd * 4, true);
    let gu3 = new Grfc(this.x, this.y, -this.padd * 3, true);
    let gu4 = new Grfc(this.x, this.y, -this.padd * 2, true);
    let gu = new Grfc(this.x, this.y, -this.padd, true);
    let gb = new Grfc(this.x, this.y, this.padd, true);
    let gb1 = new Grfc(this.x, this.y, +this.padd * 2, true);
    let gb2 = new Grfc(this.x, this.y, +this.padd * 3, true);
    let gb3 = new Grfc(this.x, this.y, +this.padd * 4, true);
    let gb4 = new Grfc(this.x, this.y, +this.padd * 5, true);
    let gb5 = new Grfc(this.x, this.y, +this.padd * 6, true);
    let gb6 = new Grfc(this.x, this.y, +this.padd * 6, true);
    let gb7 = new Grfc(this.x, this.y, +this.padd * 7, true);
    let gb8 = new Grfc(this.x, this.y, +this.padd * 8, true);
    grfc.push(gu1);
    grfc.push(gu2);
    grfc.push(gu3);
    grfc.push(gu4);
    grfc.push(gu5);
    grfc.push(gu6);
    grfc.push(gu7);
    grfc.push(gu);
    grfc.push(gb);
    grfc.push(gb1);
    grfc.push(gb2);
    grfc.push(gb3);
    grfc.push(gb4);
    grfc.push(gb5);
    grfc.push(gb6);
    grfc.push(gb7);
    grfc.push(gb8);
  }

  update() {
    let pos = createVector(this.x, this.ymid);
    let d = p5.Vector.dist(obj, pos);
    this.len = map(d, 0, width, len, len * 25);
    this.clen = map(abs(obj.x - this.x), 0, width, len, pow(len, 0.75));
    this.sw = map(abs(obj.y - this.ymid), 0, height, SW / 2, SW * 2);

    if (this.child) {
      this.y1 = this.y - this.clen + this.padd;
      this.y2 = this.y + this.clen + this.padd;
    } else {
      this.y1 = this.y - this.clen;
      this.y2 = this.y + this.clen;
    }

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