class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.walls = [true, true, true, true];
  }

  //————————————————————————————————————————————————show
  show() {
    // if visited
    if (this.visited) {
      noStroke();
      fill(clrs['sub']);
      rect(this.x * scl, this.y * scl, scl, scl);
    }

    // draw walls
    stroke(clrs['main']);
    strokeWeight(SW);
    let tempX = this.x * scl;
    let tempY = this.y * scl;
    if (this.walls[0]) line(tempX, tempY, tempX + scl, tempY);
    if (this.walls[1]) line(tempX + scl, tempY, tempX + scl, tempY + scl);
    if (this.walls[2]) line(tempX + scl, tempY + scl, tempX, tempY + scl);
    if (this.walls[3]) line(tempX, tempY + scl, tempX, tempY);
  }

  //————————————————————————————————————————————————check neighbors
  checkNeighbors() {
    let neighbors = [];

    let top = cells[this.index(this.x, this.y - 1)];
    let right = cells[this.index(this.x + 1, this.y)];
    let bottom = cells[this.index(this.x, this.y + 1)];
    let left = cells[this.index(this.x - 1, this.y)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
  }

  index(x, y) {
    if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
      return -1;
    }
    return x + y * cols;
  }

}