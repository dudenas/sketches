let detail = 20;
let padd = 10;


class Grfc {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // left eye
    this.eyes = [];
    this.id = random(5);
    let eye = new Eye(this.x + scl / 4, this.y + padd + rSize / 2, this.id);
    this.eyes.push(eye);
    eye = new Eye(this.x + scl / 4 * 3, this.y + padd + rSize / 2, this.id);
    this.eyes.push(eye);

    this.theta = PI / 4;
  }

  show() {
    strokeWeight(1);
    noFill();
    rect(this.x, this.y, scl, scl);

    stroke(clrs[1]);
    strokeWeight(SW);
    noFill();
    beginShape();
    vertex(this.x + scl / 2, this.y + padd);
    vertex(this.x + scl / 2, this.y + scl / 2 - padd);
    for (let i = 0; i < detail; i++) {
      let r = scl / 2 - padd;
      let angle = map(i, 0, detail, 0, this.theta);
      let x = this.x + padd + r * cos(angle);
      let y = this.y + scl / 2 + r * sin(angle + (this.id / 5));
      vertex(x, y);
    }
    endShape();

    for (let eye of this.eyes) {
      eye.update();
      eye.show();
    }

  }

  update() {
    let percent = ((frameCount + this.id * 4) % (totalFrames * 4)) / (totalFrames * 4);
    percent = ease[styles[2]](percent);
    this.theta = map(sin(percent * TWO_PI), -1, 1, 0, PI / 2);
  }
}

class Eye {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.move = 0;
    this.id = random(1) > 0.1 ? id : random(5);
  }

  update() {
    let percent = ((frameCount + this.id * 10) % totalFrames) / totalFrames;
    if (this.id > 3) percent = ease[styles[0]](percent);
    this.move = map(sin(percent * TWO_PI), -1, 1, -rSize / 2 + this.id, 0);
  }

  show() {
    noStroke();
    fill(clrs[1]);
    ellipse(this.x, this.y, rSize, rSize);
    beginShape();
    fill(clrs[0]);

    let x1 = this.x - rSize / 2;
    let x2 = this.x + rSize / 2;
    let xa1 = this.x - rSize / 3;
    let xa2 = this.x + rSize / 3;
    let ya1 = this.y + this.move;
    let ya2 = this.y - this.move;
    vertex(x1, this.y);
    bezierVertex(xa1, ya1, xa2, ya1, x2, this.y);
    vertex(x1, this.y);
    bezierVertex(xa1, ya2, xa2, ya2, x2, this.y);
    endShape();
  }
}