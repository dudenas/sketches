class Walker {
  constructor(pos, special) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }
    this.next = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 2;
    this.prev = [];
    if(special) this.special = special; else this.special = false;
    this.clr = this.special ? color(clrs['sub'][0], clrs['sub'][1], clrs['sub'][2])
    : color(clrs['main'][0], clrs['main'][1], clrs['main'][2]);
  }

  show() {
    noFill();
    stroke(this.clr);
    strokeWeight(SW/5);

    beginShape();
    for (let i = 0; i < this.prev.length; i++) {
      vertex(this.prev[i].x, this.prev[i].y);
    }
    endShape();
    // strokeWeight(SW);
    noStroke();
    fill(this.clr);
    //point(this.pos.x, this.pos.y);
    ellipse(this.pos.x,this.pos.y,SW);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);
    this.vel.mult(0.95);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  move() {
    this.prev.push(this.pos.copy());
    if (this.prev.length > prevAmount) {
      this.prev.splice(0, 1);
    }

    let d = dist(this.pos.x, this.pos.y, this.next.x, this.next.y);
    this.speed = map(d, 0, (width + height) / 2, 0, speed);
    // let desired = p5.Vector.sub(this.next, this.pos);
    // desired.normalize();
    // let steer = p5.Vector.sub(desired, this.vel);
    // steer.mult(speed);
    // this.acc.add(steer);

    this.pos.x = lerp(this.pos.x, this.next.x, this.speed);
    this.pos.y = lerp(this.pos.y, this.next.y, this.speed);
  }

  nextPoint() {
    this.next = createVector(random(width), random(height));
  }
}