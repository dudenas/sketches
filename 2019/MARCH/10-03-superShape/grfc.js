let n1 = 1.7,
  n2 = 0.5,
  n3 = 0.5,
  a = 1,
  b = 1,
  radius = 200,
  totalPoints = 124,
  percent = 0,
  max_theta = 0;

class Grfc {
  constructor(min, max) {
    this.m = min;
    this.min = min;
    this.max = max;
  }

  // supershape
  superShape(angle) {
    let part1 = pow(abs((1 / a) * cos(angle * this.m / 4)), n2 * 2);
    let part2 = pow(abs((1 / b) * sin(angle * this.m / 4)), n3);
    let part3 = pow(part1 + part2, (1 / n1));
    if (part3 === 0) return 0;
    return (1 / part3);
  }

  show() {
    for (let i = 1; i < totalPoints; i++) {
      let theta = map(i, 0, totalPoints, 0, max_theta);
      let r = this.superShape(theta);
      let x = radius * r * cos(theta);
      let y = radius * r * sin(theta);
      noFill();
      stroke(250);
      strokeWeight(map(i, 0, totalPoints, 0, SW * 3));
      point(x, y);

    }
    beginShape();
    for (let i = 1; i < totalPoints; i++) {
      let theta = map(i, 0, totalPoints, 0, max_theta);
      let r = this.superShape(theta);
      let x = radius * r * cos(theta);
      let y = radius * r * sin(theta);
      noFill();
      stroke(250);
      strokeWeight(SW);
      point(x, y);
      if (random(1) > 0.95) vertex(x, y);
    }
    endShape();
  }

  update() {
    percent = (frameCount % totalFrames) / totalFrames;

    if (percent <= 0.5) {
      percent = easeOutQuad(percent);
      this.m = map(percent, 0, 0.5, this.min, this.max);
      max_theta = map(percent, 0, 0.5, 0, 2 * TWO_PI);
    } else {
      percent = easeInQuad(percent);
      this.m = map(percent, 0.5, 1, this.max, this.min);
      max_theta = map(percent, 0.5, 1, 2 * TWO_PI, 0);
    }
  }
}

// accelerating from zero velocity
function easeInQuad(t) {
  return t * t;
}
// // decelerating to zero velocity
function easeOutQuad(t) {
  return t * (2 - t)
}