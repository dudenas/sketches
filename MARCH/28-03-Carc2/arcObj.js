class ArcObj {
  constructor(r, sw, index) {
    this.r = r;
    this.start = startAngle;
    this.end = endAngle;
    this.angle = PI / 2;
    this.sw = sw;
    this.speed = random(0.2, 0.5);
    // this.angleSpeedStart = random(-PI/2, PI/2);
    // this.angleSpeedEnd = random(-PI/2, PI/2);
    this.angleSpeed = random(-PI, PI);
    this.index = index;

    this.curstyle = pickrand(styles);
  }

  render() {
    this.update();
    this.show();
  }

  update() {
    let percent = 0;
    if (this.index == 0) {
      percent = ((frameCount) % totalFrames) / totalFrames;
    } else {
      percent = ((frameCount + (totalFrames / 2)) % totalFrames) / totalFrames;
    }
    // percent = doubleExponentialSigmoid(percent, this.speed);
    percent = ease[this.curstyle](percent, floor(this.speed * 10));

    this.angle = map(percent, 0, 1, PI / 2, -PI * 3 / 2);
    if (this.percent < 0.5) {
      this.end = map(sin(percent * TWO_PI), -1, 0, endAngle + this.angleSpeed, endAngle);
      this.start = map(sin(percent * TWO_PI), -1, 0, startAngle + this.angleSpeed, startAngle);
    } else {
      this.end = map(sin(percent * TWO_PI), 0, 1, endAngle, endAngle + this.angleSpeed);
      this.start = map(sin(percent * TWO_PI), 0, 1, startAngle, startAngle + this.angleSpeed);
    }
  }

  show() {
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    strokeWeight(this.sw);
    arc(0, 0, this.r, this.r, this.start, this.end);
    pop();
  }
}