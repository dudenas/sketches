let ratio = 30;
let scl = 540 / ratio;
let cols, rows;
let grid;
let finnished = false;

function gridSetup() {
  cols = floor(width / scl);
  rows = floor(height / scl);
  grid = make2Darray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i * scl, j * scl);
    }
  }
  for (let j = 0; j < rows; j++) {
    grid[cols / 2][j].grains = 500;
  }
}

function topple() {
  finnished = true;
  let nextCells = grid;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].grains >= 4) {
        finnished = false;
        nextCells[i][j].grains -= 4;
        if (i + 1 < cols) nextCells[i + 1][j].grains++;
        if (i - 1 > -1) nextCells[i - 1][j].grains++;
        if (j + 1 < rows) nextCells[i][j + 1].grains++;
        if (j - 1 > -1) nextCells[i][j - 1].grains++;
      }
    }
  }
  grid = nextCells;
}

function make2Darray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}