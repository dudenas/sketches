class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.origPos = this.pos.copy();
    this.id = random(0,1);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed * this.id);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    noStroke();
    fill(clrs[1]);
    rect(this.pos.x, this.pos.y, scl * (1 - this.id), scl * (1 - this.id));
  }

  getBack() {
    let diff = p5.Vector.sub(this.origPos, this.pos);
    let str = diff.mag();
    diff.normalize();
    str = map(str, 0, 100, 0, maxForce * this.id);
    let force = p5.Vector.sub(diff, this.vel);
    force.mult(str);
    this.acc.add(force);
  }

  glitch() {
    if (random(1) > 0.9) {
      let factor = floor(random(1, 12));
      this.acc.x += random(-scl * factor, scl * factor);
    }
  }
}