let lenX, lenY, x1, x2, y1, y2, y;
let hline, sline_l, sline_r;
let maxLines = 12;
let maxLinesSupp = 8;

//————————————————————————————————————————————————————————————————————————————————— grfcUpdate
function grfcUpdate() {
  lenX = width / 3;
  lenY = height / 4;
  x1 = lenX;
  x2 = width - lenX;
  y1 = height / 2 - lenY;
  y2 = height / 2 + lenY;
}

//————————————————————————————————————————————————————————————————————————————————— grfcDraw
function grfcDraw() {
  stroke(clrs[1]);
  strokeWeight(SW);
  // line(x1, y1, x1, y2);
  // line(x2, y1, x2, y2);

  sline_l.update();
  sline_l.show();

  sline_r.update();
  sline_r.show();

  hline.update();
  hline.show();
}

//————————————————————————————————————————————————————————————————————————————————— grfcSetup
function grfcSetup() {
  grfcUpdate();
  hline = new grfcLine(x1, x2, y, 0);
  sline_l = new grfcLineSupport(x1, 0, x1, y1, y2, 0);
  sline_r = new grfcLineSupport(x2, x2, width, y1, y2, 0);
}
//————————————————————————————————————————————————————————————————————————————————— grfcLineSupp
let leftX = 0;
let rightX;
class grfcLineSupport {
  constructor(x, x1, x2, y1, y2, index) {
    this.x = x;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.sw = map(index, 0, maxLinesSupp - 1, SW, 1);
    this.lines = [];
    this.index = index
    if (this.index < maxLinesSupp) {
      this.createlines();
    }
  }
  createlines() {
    let l = new grfcLineSupport(this.x, this.x1, this.x2, this.y1, this.y2, this.index += 1);
    this.lines.push(l);
  }

  update() {
    let dir = 3 * PI / 2;
    let shift = 1;
    if (this.x1 !== 0) {
      dir = 3 * PI / 2;
      shift = -1;
    }
    let percentSpecial = ((frameCount) % totalFrames) / totalFrames;
    let special = map(sin((percentSpecial * TWO_PI + dir)), -1, 1, 12, 24);
    let percent = ((frameCount + this.index * special) % totalFrames) / totalFrames;
    this.x = map(sin(percent * TWO_PI), -1 * shift, 1 * shift, this.x1, this.x2);
  }

  show() {
    strokeWeight(this.sw);
    line(this.x, this.y1, this.x, this.y2);
    if (this.x1 == 0 && this.x > leftX) leftX = this.x;
    else if (this.x1 !== 0 && this.x < rightX) rightX = this.x;
    for (let l of this.lines) {
      l.update();
      l.show();
    }
  }
}

//————————————————————————————————————————————————————————————————————————————————— grfcLine
class grfcLine {
  constructor(x1, x2, y, index) {
    this.x1 = x1;
    this.x2 = x2;
    this.y = y;
    this.sw = map(index, 0, maxLines - 1, SW, 1);
    this.lines = [];
    this.index = index
    if (this.index < maxLines) {
      this.createlines();
    }
  }

  createlines() {
    let l = new grfcLine(this.x1, this.x2, this.y, this.index += 1);
    this.lines.push(l);
  }

  update() {
    let percentSpecial = ((frameCount) % totalFrames) / totalFrames;
    let special = map(sin(percentSpecial * TWO_PI), -1, 1, 4, 8);
    let percent = ((frameCount + this.index * special) % totalFrames) / totalFrames;
    this.y = map(sin(percent * TWO_PI), -1, 1, y1, y2);
  }

  show() {
    strokeWeight(this.sw);
    line(leftX, this.y, rightX, this.y);
    for (let l of this.lines) {
      l.update();
      l.show();
    }
  }
}