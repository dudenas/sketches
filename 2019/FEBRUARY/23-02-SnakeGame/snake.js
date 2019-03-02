class Snake {
  constructor(pos) {
    this.pos = pos;
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  display() {
    noStroke();
    fill(color(clrs['main']));
    rect(this.pos.x * scl, this.pos.y * scl, scl, scl);
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  update() {
    this.move();
    if (this.boundries()) {
      this.pos = new p5.Vector(cols / 2, rows / 2);
    }
    this.eat();
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  move() {
    if (direction == "UP") {
      this.pos.y -= 1;
    };
    if (direction == "DOWN") {
      this.pos.y += 1
    };
    if (direction == "LEFT") {
      this.pos.x -= 1
    };
    if (direction == "RIGHT") {
      this.pos.x += 1;
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  eat() {
    for (let f of food) {
      if (dist(this.pos.x, this.pos.y, f.pos.x, f.pos.y) == 0) {
        f.eaten = true;
        return true;
      }
    }
    return false;
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  body() {

  }

  //////////////////////////////////////////////////////////////////////////////////////////
  boundries() {
    return this.pos.x * scl > width || this.pos.x * scl < 0 || this.pos.y * scl > height || this.pos.y * scl < 0;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
function keyPressed() {
  if (key === 'A') {
    direction = directions[0];
  }
  if (key == 'W') {
    direction = directions[1];
  }
  if (key == 'D') {
    direction = directions[2];
  }
  if (key == 'S') {
    direction = directions[3];
  }
}