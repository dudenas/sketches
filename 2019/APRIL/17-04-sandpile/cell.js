function cellDraw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].update();
      grid[i][j].show();
    }
  }
}

class Cell {
  constructor(x, y) {
    this.drawn = false;
    this.x = x;
    this.y = y;
    this.grains = 0;
    this.col = 0;
    this.r = scl;
  }

  changeCol() {
    switch (this.grains) {
      case 0:
        this.col = clrs[0];
        break;
      case 1:
        this.col = clrs[2];
        break;
      case 2:
        this.col = clrs[3];
        break;
      case 3:
        this.col = clrs[4];
        break;
      default:
        this.col = clrs[6];
        break;
    }
  }

  update() {
    this.changeCol();
    this.r = map(this.grains, 0, 4, scl, scl * 2);
    // this.r = scl;
  }

  show() {
    // noStroke();
    fill(this.col)
    stroke(this.col);
    strokeWeight(1);
    rectMode(CENTER);
    // if(this.grains == 3) rect(this.x, this.y, this.r, this.r);
    // else
    ellipse(this.x, this.y, this.r, this.r);
  }

  drawLines() {
    stroke(this.col);
    noFill();
    vertex(this.x, this.y);
    this.drawn = true;
  }
}