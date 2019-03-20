class Hankin {
  constructor(a, v) {
    this.a = a;
    this.v = v;
    this.b = p5.Vector.add(a, v);
    this.end;
    this.prevD;
  }

  show() {
    stroke(clrs[2]);
    line(this.a.x, this.a.y, this.end.x, this.end.y);
    if (this.end) {
      ellipse(this.end.x, this.end.y, 4);
    }
  }

  findEnd(other) {
    let den = (other.v.y * this.v.x) - (other.v.x * this.v.y);
    if (!den) {
      return;
    }
    let numa = (other.v.x * (this.a.y - other.a.y)) - (other.v.y * (this.a.x - other.a.x));
    let numb = (this.v.x * (this.a.y - other.a.y)) - (this.v.y * (this.a.x - other.a.x));

    let ua = numa / den;
    let ub = numb / den;
    let x = this.a.x + (ua * this.v.x);
    let y = this.a.y + (ua * this.v.y);

    if (ua > 0 && ub > 0) {
      let candidate = createVector(x, y);
      let d1 = p5.Vector.dist(candidate, this.a);
      let d2 = p5.Vector.dist(candidate, other.a);
      let d = d1 + d2;
      let diff = abs(d1 - d2);
      if (diff < 0.01) {
        if (!this.end) {
          this.end = candidate;
          this.prevD = d;
        } else if (d < this.prevD) {
          this.end = candidate;
          this.prevD = d;
        }
      }
    }
  }
}