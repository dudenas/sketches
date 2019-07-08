// FORCES
let maxSpeed = 4;
let minSpeedValue = 0.5;
let maxSpeedValue = 8;
let maxForce = 0.1;
let distToSteer = 100;
let pathLen = 150;

let currParticles = 50;
let maxParticles = 100;
let minParticles = 25;
let particles = [];
let r = 5;
let maxR = r * 3;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Particle
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.speed = random(1, 1.1);
    this.r = random(r, maxR);
    this.finnished = false;
    this.path = [];
  }
  //————————————————————————————————————————————————————————————————————————————————— Particle render
  render() {
    this.path.push(this.pos.copy());
    this.lookUp();
    this.edges();
    this.update();
    this.show();
    if (this.path.length > pathLen) this.path.splice(0, 1);
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
    this.applyForce(force);
  }
  //————————————————————————————————————————————————————————————————————————————————— Particle steering
  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    // normalize
    desired.normalize();
    // change the magnitude based on the distance
    let str = map(d, 0, distToSteer, 0, maxSpeed, true);
    desired.mult(str);
    // steering desired - velocity
    let steer = p5.Vector.sub(desired, this.vel);
    // limit to the maximum force for smoothness
    steer.limit(maxForce);
    this.applyForce(steer);
  }

  //————————————————————————————————————————————————————————————————————————————————— Particle addForce
  applyForce(force) {
    this.acc.add(force);
  }

  //————————————————————————————————————————————————————————————————————————————————— Particle show
  show() {
    noStroke();
    fill(grfcClr);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  //————————————————————————————————————————————————————————————————————————————————— Particle edges
  edges() {
    let padd = this.r + 2;
    if (this.pos.x > width + padd * 2) {
      this.finnished = true;
    }
    if (this.pos.x < -padd * 2) this.pos.x = width + padd;
    if (this.pos.y > height + padd * 2) this.pos.y = -padd;
    if (this.pos.y < -padd * 2) this.pos.y = height + padd;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— updateSpeed
function updateSpeed() {
  maxSpeed = map(currValue, 0, 2, minSpeedValue, maxSpeedValue);
  maxR = map(currValue, 0, 2, r * 2, r * 6);
}

//————————————————————————————————————————————————————————————————————————————————— generateWave
function generateWave() {
  for (let i = 0; i < currParticles; i++) {
    let particle = new Particle(0, random(height))
    particles.push(particle);
  }
}

//————————————————————————————————————————————————————————————————————————————————— particlesDraw
function particlesUpdate() {
  updateSpeed();
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].render();
    if (particles[i].finnished) {
      particles.splice(i, 1);
    }
  }
}