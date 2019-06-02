// FORCES
let maxSpeed = 4;
let minSpeedValue = 0.5;
let maxSpeedValue = 8;
let maxForce = 0.1;
let distToSteer = 100;
let pathLen = 150;

let maxParticles = 100;
let particles = [];
let r = 5;
let maxR = r * 3;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Particle
class Particle {
  constructor(p, x, y) {
    this.p = p;
    this.pos = this.p.createVector(x, y);
    this.vel = this.p.createVector(0, 0);
    this.acc = this.p.createVector(0, 0);
    this.speed = this.p.random(1, 1.1);
    this.r = this.p.random(r, maxR);
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
    let other = grid[this.p.constrain(this.p.floor(this.pos.x / scl), 0, cols - 1)][this.p.constrain(this.p.floor(this.pos.y / scl), 0, rows - 1)];
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
    this.p.noStroke();
    this.p.fill(clrs[1]);
    this.p.ellipse(this.pos.x, this.pos.y, this.r, this.r);
    // for (let a of this.path) {
    //   this.p.ellipse(a.x, a.y, this.r, this.r);
    // }
  }

  //————————————————————————————————————————————————————————————————————————————————— Particle edges
  edges() {
    let padd = this.r + 2;
    if (this.pos.x > this.p.width + padd * 2) {
      this.finnished = true;
    }
    if (this.pos.x < -padd * 2) this.pos.x = this.p.width + padd;
    if (this.pos.y > this.p.height + padd * 2) this.pos.y = -padd;
    if (this.pos.y < -padd * 2) this.pos.y = this.p.height + padd;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— updateSpeed
function updateSpeed(p) {
  maxSpeed = p.map(currValue, 0, 2, minSpeedValue, maxSpeedValue);
  maxR = p.map(currValue, 0, 2, r * 2, r * 6);
}

//————————————————————————————————————————————————————————————————————————————————— generateWave
function generateWave(p) {
  for (let i = 0; i < maxParticles; i++) {
    let particle = new Particle(p, 0, p.random(p.height))
    particles.push(particle);
  }
}

//————————————————————————————————————————————————————————————————————————————————— particlesDraw
function particlesUpdate(p) {
  updateSpeed(p);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].render();
    if (particles[i].finnished) {
      particles.splice(i, 1);
    }
  }
}