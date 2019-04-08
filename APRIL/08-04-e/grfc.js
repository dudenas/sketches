class eLine {
  constructor(x, y) {
    this.pos1 = createVector(x - padd, y - padd);
    this.pos2 = createVector(width / 2 - padd / 2, y - padd);
    this.pos3 = createVector(width, 0);
    this.dir = 2;
  }

  update() {
    this.pos3.y = map(y, 0, 1, this.pos1.y - height / 3, this.pos1.y + height / 3);
    this.pos2.y = map(y, 0, 1, this.pos1.y - height / 2, this.pos1.y + height / 2);
    this.pos2.x = map(x, 0, 1, 0, width);
  }

  show() {
    stroke(clrs[1]);
    strokeWeight(SW);
    noFill();
    for (let n = 0; n < lineNum; n++) {
      let lpadd = n * 5;
      beginShape();
      vertex(this.pos1.x, this.pos1.y + lpadd);
      vertex(this.pos2.x, this.pos2.y + lpadd);
      vertex(this.pos3.x, this.pos3.y + lpadd);
      endShape();
    }
  }
}