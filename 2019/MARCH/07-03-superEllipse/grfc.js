class Grfc {
  constructor(min, max) {
    this.n = min;
    this.min = min;
    this.max = max;
  }

  show() {
    for (let i = 0; i < totalPoints; i++) {
      let theta = map(i, 0, totalPoints, 0, TWO_PI);
      let x = pow(abs(cos(theta)), (2.0 / this.n)) * (a * sgn((cos(theta))));
      let y = pow(abs(sin(theta)), (2.0 / this.n)) * (b * sgn((sin(theta))));
      noFill();
      stroke(250);
      strokeWeight(SW);
      point(x, y);
    }
  }

  update() {
    let percent = (frameCount % totalFrames) / totalFrames;
    // percent = easeInOutQuad(percent);
    if (percent <= 0.5) {
      percent = easeOutQuad(percent);
      this.n = map(percent, 0, 0.5, this.min, this.max);
    } else {
      percent = easeInQuad(percent);
      this.n = map(percent, 0.5, 1, this.max, this.min);
    }
  }
}

function sgn(angle) {
  if (angle < 0) return -1;
  if (angle == 0) return 0;
  if (angle > 0) return 1;
}

// accelerating from zero velocity
function easeInQuad(t) {
  return t * t;
}
// // decelerating to zero velocity
function easeOutQuad(t) {
  return t * (2 - t)
}