let cols, rows;
let ratio = 40;
let scl;
let grid;
let SW = 1;
let time = 0;

//————————————————————————————————————————————————————————————————————————————————— fieldSetup
function fieldSetup() {
  scl = width / ratio;
  cols = floor(width / scl);
  rows = floor(height / scl);
  grid = make2Darray(cols, rows);
  console.log(scl, cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
}

//————————————————————————————————————————————————————————————————————————————————— fieldDraw
function fieldDraw() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

//————————————————————————————————————————————————————————————————————————————————— fieldDraw
function fieldUpdate() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].setAngle();
    }
  }
}

//————————————————————————————————————————————————————————————————————————————————— cell
class Cell {
  constructor(x, y) {
    this.pos = createVector(x * scl, y * scl);
    this.angle = 0;
    this.setAngle();
  }
  //————————————————————————————————————————————————————————————————————————————————— cell setAngle
  setAngle() {
    this.angle = map(noise(this.pos.x / (width), this.pos.y / (height), time), 0, 1, 0, TWO_PI);
  }

  //————————————————————————————————————————————————————————————————————————————————— cell show
  show() {
    stroke(clrs[1]);
    strokeWeight(SW);
    noFill();
    push();
    translate(this.pos.x + scl / 2, this.pos.y + scl / 2);
    rotate(this.angle);
    line(-scl / 2, 0, scl / 2, 0);
    pop();
  }
}

//————————————————————————————————————————————————————————————————————————————————— help
function make2Darray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}