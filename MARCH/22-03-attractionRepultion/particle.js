class Particle {
  constructor(x, y, r, alpha, attractor) {
    if (attractor || alpha) {
      this.pos = createVector(x, y);
    } else {
      this.pos = createVector(x, y);
      // this.pos = createVector(width / 2, height / 2);
    }
    this.prev = this.pos.copy();
    // this.vel = p5.Vector.random2D();
    this.vel = createVector();
    // this.vel.setMag(random(2, 5));
    this.acc = createVector();
    this.maxSpeed = 4;
    if (attractor) {
      this.attractor = attractor;
    } else {
      this.attractor = false;
    }

    if (r) this.r = r;
    else this.r = random(2);
    if (alpha) this.alpha = alpha;
    else this.alpha = 15;
  }

  show() {
    noFill();
    stroke(clrs[1], this.alpha);
    strokeWeight(SW);
    if (this.r > 2) {
      if (!this.attractor) {
        stroke(clrs[2], this.alpha);
      }
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
    } else {
      line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    }
    this.prev = this.pos.copy();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  attracted(target) {
    let force = p5.Vector.sub(target.pos, this.pos);
    let str = force.magSq();
    str = constrain(str, 1, 50);
    let G = 1;
    let magnitude = float(G) / float(str);
    force.setMag(magnitude);
    if (!target.attractor) {
      force.mult(-1);
    }
    this.applyForce(force);
  }
}