let lineOn = false;

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
    // if (this.visited) {
    //   noStroke();
    //   fill(clrs['sub']);
    //   rect(this.x * scl, this.y * scl, scl, scl);
    // }

    // draw walls
    textAlign(CENTER, CENTER);
    textSize(7);
    let tempX = this.x * scl;
    let tempY = this.y * scl;
    if (this.walls[0]) {
      if (lineOn) {
        stroke(clrs['sub']);
        line(tempX, tempY, tempX + scl, tempY);
      }
      fill(clrs['main']);
      noStroke();
      text('.   ?', (tempX + tempX + scl) / 2, tempY);
    }
    if (this.walls[1]) {
      if (lineOn) {
        stroke(clrs['main']);
        line(tempX + scl, tempY, tempX + scl, tempY + scl);
      }
      push();
      noStroke();
      fill(clrs['main']);
      translate(tempX + scl, (tempY + tempY + scl) / 2);
      rotate(PI / 2);
      text('.   !', 0, 0);
      pop();
    }
    if (this.walls[2]) {
      if (lineOn) {
        stroke(clrs['main']);
        line(tempX + scl, tempY + scl, tempX, tempY + scl);
      }
      fill(clrs['main']);
      noStroke();
      text('  !  ', (tempX + tempX + scl) / 2, tempY + scl);
    }
    if (this.walls[3]) {
      if (lineOn) {
        stroke(clrs['main']);
        line(tempX, tempY + scl, tempX, tempY);
      }
 
      push();
      fill(clrs['main']);
      noStroke();
      translate(tempX, (tempY + tempY + scl) / 2);
      rotate(-PI / 2);
      text('  ?  ', 0, 0);
      pop();
    }
  }

  highlight() {
    noStroke();
    fill(clrs['main']);
    rect(this.x * scl, this.y * scl, scl, scl);
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

    if (neighbors.length > 0) {
      return neighbors[floor(random(0, neighbors.length))];
    } else {
      return undefined;
    }
  }

  index(x, y) {
    if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
      return -1;
    } else return x + y * cols;
  }

}