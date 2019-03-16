let hu = 5;

class Walker {
  constructor(x, y) {
    if (arguments.length == 2) {
      this.pos = createVector(x, y);
      this.stuck = true;
    } else {
      this.pos = this.randomPoint();
      this.stuck = false;
    }
    this.hu = hu;
    this.r = r;
  }

  randomPoint() {
    let i = floor(random(4));
    switch (i) {
      case 0:
        return createVector(random(width), 0);
        break;
      case 1:
        return createVector(random(width), height);
        break;
      case 2:
        return createVector(0, random(height));
        break;
      default:
        return createVector(width, random(height));
    }
  }

  walk() {
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  checkStuck(others) {
    for (let i = 0; i < others.length; i++) {
      let elm = others[i];
      let d = distSq(this.pos, elm.pos);
      if (d < this.r * elm.r * 4) {
        this.stuck = true;
        hu -= this.r;
        if (hu <= 5) hu = 250;
        return true;
        break;
      }
    }
    return false;
  }

  show() {
    noStroke();
    if (this.stuck) {
      // let hu = map(this.r, minRadius, maxRadius, 0, 255);
      fill(this.hu);
    } else {
      fill(clrs['main']);
    }
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

function distSq(a, b) {
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  return dx * dx + dy * dy;
}