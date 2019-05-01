let detail = 24;
let pg;
let distance = 80;
let totalFramesCell = 100;

//————————————————————————————————————————————————————————————————————————————————— texture
function createTexture() {
  pg = createGraphics(scl, scl);
  pg.noStroke();
  pg.fill(clrs[0]);
  pg.rect(0, 0, scl, scl / 2);
  pg.fill(clrs[1]);
  pg.rect(0, scl / 2, scl, scl / 2);
}

//————————————————————————————————————————————————————————————————————————————————— cell
class Cell {
  constructor(x, y, icell) {
    this.x = x;
    this.y = y;
    this.theta = -PI / 2;
    this.r = scl / 3;
    this.moving = false;
    this.percent = 1;
    this.icell = icell;
  }
  //————————————————————————————————————————————————————————————————————————————————— cell_update
  update() {
    let d = dist(obj.x, obj.y, this.x, this.y);
    if (d < distance && !this.moving) {
      this.moving = true;
      this.startFrame = frameCount;
    }

    if (this.moving) {
      this.percent = ((frameCount - this.startFrame)) / totalFramesCell;
      this.percent = ease[styles[1]](this.percent);
      this.theta = map(this.percent, 0, 1, -PI / 2, -TWO_PI - PI / 2);
    }

    // ending condition
    if (this.percent >= 1) {
      this.percent = 0;
      this.moving = false;
      this.theta = -PI / 2;
    }
  }

  update_i() {
    this.percent = (frameCount % totalFrames) / totalFrames;
    this.percent = ease[styles[0]](this.percent);
    this.theta = map(this.percent, 0, 1, 0, TWO_PI);
  }
  //————————————————————————————————————————————————————————————————————————————————— cell_show
  show() {
    push();
    noStroke();
    translate(this.x, this.y);
    texture(pg);
    rotateX(this.theta);
    sphere(this.r, detail, detail);
    pop();
  }
}