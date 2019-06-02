let SW = 1;
let angle = 0;
let stepCount = 800;
let path = [];
let r;
let scl = 1;
let speed = 1;
let theta = 0;
let back = false;

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  r = width / 4 * 3;
  step = (TWO_PI * 8) / stepCount;
  for (let i = 0; i < stepCount; i++) {
    angle += step;
    let x = r * cos(angle);
    let y = r * sin(angle);
    path.push(createVector(x, y));
    r *= (100 - speed) / 100;
  }
}

//————————————————————————————————————————————————————————————————————————————————— grfcUpdate
function grfcUpdate() {
  let percent = (frameCount % totalFrames) / totalFrames;
  if (back) theta = map(sin(percent * TWO_PI), -1, 1, angle / 12, -angle / 12);

  translate(width / 2, height / 2);
  rotate(-PI + theta);
  scale(-1, 1);
  angle += step;
  r *= (100 - speed) / 100;
  SW = (2 / scl);
  let x = r * cos(angle);
  let y = r * sin(angle);
  path.push(createVector(x, y));
  scale(scl);
  stroke(clrs[1]);
  strokeWeight(SW);
  noFill();
  beginShape();
  for (let i = 0; i < path.length; i++) {
    let p = path[i];
    vertex(p.x, p.y);
  }
  endShape();
  stroke(clrs[0]);
  strokeWeight(SW * 2);
  noFill();
  beginShape();
  for (let i = floor(stepCount / 8); i < stepCount / 4; i++) {
    let p = path[i];
    vertex(p.x, p.y);
  }
  endShape();

  stroke(clrs[1]);
  strokeWeight(SW * 2);
  noFill();
  beginShape();
  for (let i = floor(stepCount / 7); i < stepCount / 5; i++) {
    let p = path[i];
    vertex(p.x, p.y);
  }
  endShape();
  path.splice(0, 1);
  scl *= 1 / ((100 - speed) / 100);

  if (frameCount % totalFrames == 0) back = !back;
}