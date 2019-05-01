//—————————————————————————————————————————————————————— Cell
class Cell {
  constructor(x, y, w, h, index, child) {
    this.x = x;
    this.y = y;
    this.xo = x;
    this.yo = y;
    this.w = w;
    this.h = h;
    this.index = index;
    this.col = clrs[floor(random(1, 5))];
    this.total = floor(map(pow(day[index].value, 3), 0, 2, 1, 13));
    this.child = child;
    this.children = [];
    this.createChildren();
  }
  //—————————————————————————————————————————————————————— Cell update
  update() {
    // let special = map(abs(currTime - this.index), 0, 95, 1, 0);
    // let rndm = random(0,this.w * special);
    // this.x = lerp(this.x, this.xo + pow(rndm, 2), map(pow(special, 2), 0, 1, 0.01, 0.001));
  }

  //—————————————————————————————————————————————————————— Cell arr
  createChildren() {
    let paddY = this.h;
    for (let i = 0; i < this.total; i++) {
      // let paddX = random(-this.w / 2, this.w / 2);
      let paddX = map(i, 0, this.total, -this.w, this.w);
      if (!this.child) this.children.push(new Cell(this.x + paddX, this.y + paddY, this.w, this.h, this.index, true))
      paddY += this.h;
    }
  }

  //—————————————————————————————————————————————————————— Cell show
  show() {
    stroke(clrs[0]);
    strokeWeight(SW);
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y + this.h / 2, this.h, this.h);
    rect(this.x - this.h / 2, this.y + this.h / 2, this.h, this.h / 2);
    rect(this.x, this.y, this.w, this.h);

    if (!this.child) {
      for (let c of this.children) {
        c.update();
        c.show();
      }
    }
  }
}