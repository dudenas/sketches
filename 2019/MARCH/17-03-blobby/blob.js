class Blob {
  constructor() {
    this.totalPoints = 20;
    this.r = 100;
    this.sw = 2;
    this.yoff = 0;
    this.speed_y = 0.01;
    this.speed_x = 0.4;
  }
  //————————————————————————————————————————————— setup
  show() {
    stroke(clrs['main']);
    strokeWeight(2);
    noFill();
    beginShape();
    let xoff = 0;
    let tempOff = 0;
    let px = 0;
    let py = 0;
    let cx = 0;
    let cy = 0;
    vertex(this.r, 0);
    for (let i = 0; i < this.totalPoints - 1; i++) {
      let angle = map(i, 0, this.totalPoints, 0, TWO_PI);
      let offset = map(noise(xoff, this.yoff), 0, 1, -this.r / 4, this.r / 4);


      let ro = this.r + offset;
      let x = ro * cos(angle);
      let y = ro * sin(angle);
      xoff += this.speed_x;


      if (i == 0) tempOff = offset;
      else {
        bezierVertex(x, y, px, py, cx, cy);
      }
      px = x;
      py = y;
      cx = (x + px) / 2;
      cy = (y + py) / 2;
    }
    let x = (this.r + tempOff) * cos(0);
    let y = (this.r + tempOff) * sin(0);
    vertex(x, y);
    endShape();
    this.yoff += this.speed_y;
  }
}

let yoff = 0;

function bezierEllipse(x, y, r, n) {
  // caulate length of each controls: r - (4/3)*tan(PI/(2n))
  var ctrl = r * (4 / 3) * tan(PI / (2 * n));
  // translate to the center of circle: (x, y)
  push();
  translate(x, y);

  beginShape();
  vertex(r, 0);
  let xoff = 0;
  for (var i = 0; i < n; i++) {
    var firstAngle = (PI * 2 / n) * i;
    var secondAngle = (PI * 2 / n) * (i + 1);
    let offset = map(noise(xoff, yoff), 0, 1, -50, 50);
    let ro = r + offset;
    var firstVtx = {
      x: cos(firstAngle) * ro,
      y: -sin(firstAngle) * ro
    };
    var secondVtx = {
      x: cos(secondAngle) * ro,
      y: -sin(secondAngle) * ro
    };
    var firstCtrl = {
      x: firstVtx.x - ctrl * sin(firstAngle),
      y: firstVtx.y - ctrl * cos(firstAngle)
    };
    var secondCtrl = {
      x: secondVtx.x + ctrl * sin(secondAngle),
      y: secondVtx.y + ctrl * cos(secondAngle)
    };
    drawBezierV(firstCtrl.x, firstCtrl.y, secondCtrl.x, secondCtrl.y, secondVtx.x, secondVtx.y);
    xoff += 0.1;
  }
  noFill();
  endShape();
  pop();
  yoff += 0.01;
}

// extends the original bezierVertex(), for visualize and debig purpose
function drawBezierV(x1, y1, x2, y2, x3, y3) {
  bezierVertex(x1, y1, x2, y2, x3, y3);
  fill('#4aff2e'); //marks two control point with light green
  //ellipse(x1, y1, 5, 5);
  //ellipse(x2, y2, 5, 5);
  fill('#ff2e2e'); // red
  rectMode(CENTER); //marks anchor point with red
  //rect(x3, y3, 8, 8);
}