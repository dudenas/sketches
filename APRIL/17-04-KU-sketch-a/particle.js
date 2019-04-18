function updateSpeed() {
  maxSpeed = map(currValue, 0, 2, 0, 8);
}

//————————————————————————————————————————————————————————————————————————————————— Particle
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = random(r, r * 3);
    this.speed = random(1, 1.5);
  }
  //————————————————————————————————————————————————————————————————————————————————— Particle render
  render() {
    this.lookUp();
    this.edges();
    this.update();
    
    this.show();
  }

  //————————————————————————————————————————————————————————————————————————————————— Particle update
  update() {
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed * this.speed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  //————————————————————————————————————————————————————————————————————————————————— Particle lookUp
  lookUp() {
    let other = grid[constrain(floor(this.pos.x / scl), 0, cols - 1)][constrain(floor(this.pos.y / scl), 0, rows - 1)];

    let force = p5.Vector.fromAngle(other.angle);
    this.addForce(force);
  }

  //————————————————————————————————————————————————————————————————————————————————— Particle addForce
  addForce(force) {
    this.acc.add(force);
  }

  //————————————————————————————————————————————————————————————————————————————————— Particle show
  show() {
    noStroke();
    fill(clrs[1]);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  //————————————————————————————————————————————————————————————————————————————————— Particle edges
  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}