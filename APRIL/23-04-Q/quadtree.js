let maxCapacity = 1;
let totalFrames = 150;
let maxLife = totalFrames / 4;

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
    return (point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  show() {
    // stroke(clrs[1]);
    // strokeWeight(SW_1);
    // noFill();
    // rectMode(CENTER);
    // rect(this.x, this.y, this.w * 2, this.h * 2);
    textSize(this.w * 2);
    noStroke();
    fill(clrs[1]);
    text('q', this.x - this.w / 12, this.y - this.w / 3 * 2);
  };
}

class QuadTree {
  constructor(boundary, parent, label) {
    this.points = [];
    this.boundary = boundary;
    this.divided = false;
    this.lifespan = maxLife;
    this.parent = parent ? parent : null;
    this.label = label ? label - 1 : null;
    this.finnished = [false, false, false, false];
  }

  insert(point) {
    if (!this.boundary.contains(point)) return false;
    if (this.points.length < maxCapacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        if (this.boundary.w > 10) this.supdivide();
      }
      if (this.divided) {
        if (this.northEast.insert(point)) return true;
        else if (this.northWest.insert(point)) return true;
        else if (this.southEast.insert(point)) return true;
        else if (this.southWest.insert(point)) return true;
      }
    }
  }

  supdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.northEast = new QuadTree(ne, this, 1);
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.northWest = new QuadTree(nw, this, 2);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southEast = new QuadTree(se, this, 3);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.southWest = new QuadTree(sw, this, 4);
    this.divided = true;
  }

  render() {
    this.update();
    this.show();
  }

  show() {
    if (this.divided) {
      this.northEast.render();
      this.northWest.render();
      this.southEast.render();
      this.southWest.render();
    } else {
      this.boundary.show();
    }
    // show points
    // for (let p of this.points) {
    //   p.show();
    // }
  }

  update() {
    if (this.points.length == 0 && this.parent != null) {
      this.parent.finnished[this.label] = true;
    }

    if (this.points.length == maxCapacity && this.isFinnished() && this.parent != null) {
      this.divided = false;
      this.finnished = [false, false, false, false];
      this.northEast = null;
      this.northWest = null;
      this.southEast = null;
      this.southWest = null;
    }

    if (this.lifespan <= 0) {
      this.lifespan = maxLife;
      this.points.splice(0, 1);

    }

    if (this.points.length >= 0 && !this.divided) {
      this.lifespan--;
    }
  }

  isFinnished() {
    return (this.finnished[0] == true &&
      this.finnished[1] == true &&
      this.finnished[2] == true &&
      this.finnished[3] == true);
  }
}