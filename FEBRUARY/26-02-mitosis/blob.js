class Blob {
  constructor(pos, r_) {
    this.pos = pos.copy();
    this.r = r_;
    this.touched = false;
    this.tempX = random(width);
    this.tempY = random(height);
  }

  move() {
    this.pos.x = lerp(this.pos.x, this.tempX, speed);
    this.pos.y = lerp(this.pos.y, this.tempY, speed);
    if (dist(this.pos.x, this.pos.y, this.tempX, this.tempY) < 50) {
      this.tempX = random(width);
      this.tempY = random(height);
    }
  }

  show() {
    stroke(color(clrs['main'][0], clrs['main'][1], clrs['main'][2], 75));
    strokeWeight(1);
    fill(color(clrs['main'][0], clrs['main'][1], clrs['main'][2], 75));
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  mitosis() {
    addBlob(createVector(this.pos.x - this.r / 2, this.pos.y), this.r / 2);
    addBlob(createVector(this.pos.x + this.r / 2, this.pos.y), this.r / 2);
    this.touched = true;
  }
}

function addBlob(pos, r_) {
  let b = new Blob(pos, r_);
  blobs.push(b);
}