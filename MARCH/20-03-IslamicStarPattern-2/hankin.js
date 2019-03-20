class Hankin {
  constructor(a, v) {
    this.a = a;
    this.v = v;
    this.b = p5.Vector.add(a, v);
  }

  show() {
    stroke(clrs[2]);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    if (this.b) {
      ellipse(this.b.x, this.b.y, 4);
    }
  }
}