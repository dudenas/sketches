class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.prev = this.pos.copy();
  }
  update() {
    this.prev = this.pos.copy();
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(clrs[1], alpha);
    strokeWeight(SW);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.prev.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.prev.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.prev.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.prev.y = height;
    }
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }
}