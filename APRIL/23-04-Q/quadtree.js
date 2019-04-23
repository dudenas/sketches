let maxCapacity = 4;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    stroke(clrs[1]);
    strokeWeight(SW_2);
    point(this.x, this.y);
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (point.x > this.x - this.w &&
      point.x < this.x + this.w &&
      point.y > this.y - this.h &&
      point.y < this.y + this.h
    );
  }

  show() {
    stroke(clrs[1]);
    strokeWeight(SW_1);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.w * 2, this.h * 2);
  };
}

class QuadTree {
  constructor(boundary) {
    this.points = [];
    this.boundary = boundary;
    this.divided = false;
  }

  insert(point) {
    if (!this.boundary.contains(point)) return;
    if (this.points.length < maxCapacity) {
      this.points.push(point);
    } else {
      if (!this.divided) this.supdivide();
      this.northEast.insert(point);
      this.northWest.insert(point);
      this.southEast.insert(point);
      this.southWest.insert(point);
    }
  }

  supdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.northEast = new QuadTree(ne);
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.northWest = new QuadTree(nw);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southEast = new QuadTree(se);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.southWest = new QuadTree(sw);
    this.divided = true;
  }

  show() {
    this.boundary.show();
    if(this.divided)
    {
      this.northEast.show();
      this.northWest.show();
      this.southEast.show();
      this.southWest.show();
    }
  }
}