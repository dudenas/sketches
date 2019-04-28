let cols, rows;
let scl = 12;
let letters = [];
let SW_1 = 1;
let SW_2 = 4;

/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— Letter
class Letter {
  constructor(x, y, i, j) {
    this.x = x;
    this.y = y;
    this.yo = y;
    this.x1 = x - scl / 3;
    this.x3 = x + scl / 3;
    this.y1 = y - scl / 3;
    this.y2 = y;
    this.y3 = y + scl / 2;
    this.j = j;
    this.i = i;
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter update
  update() {
    let percent = (frameCount % totalFrames) / totalFrames;
    let percenta = ease[styles[2]](percent);
    this.y1 = map(sin(percent * TWO_PI), -1, 1, this.y - scl / 3, this.y - (scl * this.i / 2));
    this.y = map(sin(percent * TWO_PI), -1, 1, this.yo * 1.2, this.yo - pow(scl * this.j, 1 + this.i / 24));
    this.y2 = this.y;
    this.y3 = map(sin(percent * TWO_PI), -1, 1, this.y + scl / 2, this.y + scl / 2);
  }

  //————————————————————————————————————————————————————————————————————————————————— Letter show
  show() {
    stroke(clrs[1]);
    strokeWeight(SW_1);
    noFill();
    rectMode(CENTER);
    // rect(this.x, this.y, scl, scl);

    strokeWeight(SW_2);

    beginShape();
    vertex(this.x1, this.y1);
    vertex(this.x1, this.y2);
    bezierVertex(this.x1, this.y3, this.x3, this.y3, this.x3, this.y2);
    vertex(this.x3, this.y1);
    endShape();

  }
}
/////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— grfcDraw
function grfcDraw() {
  for (let l of letters) {
    l.update();
    l.show();
  }
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  scl = floor(width / scl);

  cols = float(width / scl);
  rows = float(height / scl);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      letters.push(new Letter(i * scl + scl / 2, j * scl + scl / 2, i, (rows - j)));
    }
  }
}