let totalFrames = 100;

//————————————————————————————————————————————————————————————————————————————————— obj class
class Obj {
  constructor(x, y, i, j) {
    this.x = x;
    this.y = y;
    this.y1 = y1;
    this.y2 = y2;
    this.value = 0;
    this.next = 0;
    this.speed = 0;
    this.i = i;
    this.j = j;
    switch (this.i) {
      case 0:
      case 4:
        this.speed = 1 / 6;
        break;
      case 1:
      case 3:
        this.speed = 1 / 3;
        break;
      case 2:
        this.speed = 1;
        break;
    }
  }
  //————————————————————————————————————————————————————————————————————————————————— update
  update() {
    this.value = lerp(this.value, this.next, this.speed);
    this.y2 = map(this.value, 0, 255, y1, y3);
    this.y1 = map(pow(this.value,4), 0, pow(255,4), y1, y3 / 2);
    switch (this.j) {
      case 0:
      case 4:
        this.next = bass;
        break;
      case 1:
      case 3:
        this.next = mid;
        break;
      case 2:
        this.next = treble;
        break;
    }

  }

  //————————————————————————————————————————————————————————————————————————————————— show
  show() {
    push();
    translate(this.x, this.y);
    stroke(clrs[1]);
    strokeWeight(SW);
    noFill();
    beginShape();
    vertex(x1, this.y1)
    vertex(x1, y3);
    vertex(x2, this.y2);
    vertex(x3, y3);
    vertex(x3, this.y1);
    endShape();
    pop();
  }
}