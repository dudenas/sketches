let SW_1 = 1;
let SW_2 = 1;
let SW_3 = 2;

//————————————————————————————————————————————— show Image
function showImage() {
  // draw image
  if (loaded) {
    image(img, width / 2, 0);
  }

  // draw values
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let value = grid[i][j];
      stroke(clrs[1]);
      strokeWeight(SW_1);
      fill(value * 255);
      rect(i * scl, j * scl, scl, scl);

      stroke(clrs[2]);
      strokeWeight(SW_2);
      noFill();
      line(i * scl + scl / 2, j * scl + scl, i * scl + scl / 2, j * scl + scl - (value * scl));
    }
  }

  // draw lines
  stroke(clrs[0]);
  strokeWeight(SW_1);
  noFill();
  beginShape();
  imgData.forEach((elm, index) => {
    let x = map(index, 0, imgData.length, width / 2, width);
    let y = map(elm, 0, 1, height, 0);
    vertex(x, y);
  })
  endShape();

  // draw points
  imgData.forEach((elm, index) => {
    let x = map(index, 0, imgData.length, width / 2, width);
    let y = map(elm, 0, 1, height, 0);
    stroke(clrs[2]);
    strokeWeight(SW_3);
    noFill();
    point(x, y);
  })
}

//————————————————————————————————————————————— setup Image
function setupImage() {
  img.resize(0, height);
  console.log('image is loaded');

  // go over the pixels and create a new rescaled image
  img.loadPixels();
  let max = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = (i * scl + j * scl * (width / 2)) * 4;
      let b1 = brightness(img.pixels[index + 0]);
      let b2 = brightness(img.pixels[index + 1]);
      let b3 = brightness(img.pixels[index + 2]);
      // get avarege from the values
      let b = (b1 + b2 + b3) / 3;
      // remap values
      b = map(b, 0, 100, 0, 1);
      // test function for the maximum value
      if (b > max) max = b;
      grid[i][j] = b;
    }
  }

  imgData = toLineArray(grid);
}

//————————————————————————————————————————————— to line Array
function toLineArray(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    for (let j = 0; j < temp.length; j++) {
      newArr.push(temp[j]);
    }
  }
  return newArr;
}