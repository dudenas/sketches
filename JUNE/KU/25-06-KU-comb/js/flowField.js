let cols, rows;
let ratio = 40;
let scl;
let grid;
let time = 0;
let fieldSpeed = Math.PI / 120;
let deviation = -Math.PI * 2; //-Math.PI / 2; //Math.PI / 4;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— cell
class Cell {
  constructor(x, y) {
    this.pos = createVector(x * scl + scl / 2, y * scl + scl / 2);
    this.angle = 0;
  }
  //————————————————————————————————————————————————————————————————————————————————— cell updateAngle
  updateAngle() {
    let index = floor(map(this.pos.x / scl, 0, width / scl, 0, 96));
    let max = map(pow(day[index].value, 1.5), 0, 2, 0, deviation);
    this.angle = map(noise(this.pos.x / (width), this.pos.y / (height), time), 0, 1, -max, max);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//————————————————————————————————————————————————————————————————————————————————— fieldSetup
function fieldSetup() {
  scl = width / ratio;
  cols = floor(width / scl);
  rows = floor(height / scl);
  grid = make2Darray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
}

//————————————————————————————————————————————————————————————————————————————————— fieldDraw
function fieldUpdate() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].updateAngle();
    }
  }

  // increase time
  time += fieldSpeed;
}

//————————————————————————————————————————————————————————————————————————————————— 2dArray
function make2Darray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}