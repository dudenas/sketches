let angle = 15;
let delta = 15;
let sides = 4;

//————————————————————————————————————————————— Edge
class Edge {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.h1;
    this.h2;
  }

  show() {
    stroke(clrs[1]);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    this.h1.show();
    this.h2.show();
  }

  hankin() {
    let mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);

    let v1 = p5.Vector.sub(this.a, mid);
    let v2 = p5.Vector.sub(this.b, mid);

    // edge length
    let elen = v1.mag() + delta;

    let off1 = mid;
    let off2 = mid;
    if (delta > 0) {
      v1.setMag(delta);
      v2.setMag(delta);

      off1 = p5.Vector.add(mid, v2);
      off2 = p5.Vector.add(mid, v1);
    }

    v1.normalize();
    v2.normalize();

    v1.rotate(radians(-angle));
    v2.rotate(radians(angle));

    // Law of sines
    let interior = ((sides - 2) * PI) / sides;
    let alpha = interior * 0.5;
    var beta = PI - alpha - radians(angle);
    let hlen = elen * (sin(alpha) / sin(beta));
    v1.setMag(hlen);
    v2.setMag(hlen);


    this.h1 = new Hankin(off1, v1);
    this.h2 = new Hankin(off2, v2);
  }
}