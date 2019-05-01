//———————————————————————————————————— versions
let percent;
// version
let version = 'd';

// a
function versionA(percent) {
  if (percent <= 1) {
    y2 = map(percent, 0, 1, height, height / 4);
  } else if (percent <= 2) {
    y2 = map(percent, 1, 2, height / 4, height);
  } else if (percent <= 3) {
    //
  } else if (percent <= 4) {
    y2 = height;
  }
}

// b
function versionB(percent) {
  if (percent <= 1) {
    y3 = height / 2;
    y2 = map(percent, 0, 1, height, height / 4 * 3);
  } else if (percent <= 2) {
    y2 = height / 4 * 3;
    y3 = map(percent, 1, 2, height / 2, height / 4 * 3);
  } else if (percent <= 3) {
    y3 = map(percent, 2, 3, height / 4 * 3, height);
    y2 = map(percent, 2, 3, height / 4 * 3, height / 4 * 2);
  } else if (percent <= 4) {
    y2 = height / 4 * 2;
    y3 = height;
  }
}

// c
function versionC(percent) {
  if (percent <= 1) {
    x3 = width;
    x2 = 0;
    x2 = map(percent, 0, 1, 0, width / 2);
  } else if (percent <= 2) {
    x2 = map(percent, 1, 2, width / 2, width);
  } else if (percent <= 3) {
    x2 = width;
  } else if (percent <= 4) {
    x3 = map(percent, 3, 4, width, 0);
  }
}

// d
function versionD(percent) {
  if (percent <= 1) {
    x2 = width;
    x3 = 0;
    x3 = map(percent, 0, 1, 0, width / 2);
  } else if (percent <= 2) {
    x3 = map(percent, 1, 2, width / 2, width);
    x2 = map(percent, 1, 2, width, 0);
  } else if (percent <= 3) {
    x3 = width;
    
  } else if (percent <= 4) {
    x2 = 0;
  }
}

// main
function versionMain(percent) {
  if (percent <= 1) {
    x1 = map(percent, 0, 1, 0, width / 4);

    x4 = width;
    y4 = map(percent, 0, 1, 0, height);
  } else if (percent <= 2) {
    x1 = map(percent, 1, 2, width / 4, width / 2);

    y4 = height;
    x4 = map(percent, 1, 2, width, 0);
  } else if (percent <= 3) {
    x1 = map(percent, 2, 3, width / 2, width / 4 * 3);

    x4 = 0;
    y4 = map(percent, 2, 3, height, height / 2);
  } else if (percent <= 4) {
    x1 = map(percent, 3, 4, width / 4 * 3, width);

    y4 = map(percent, 3, 4, height / 2, 0);
  }
}

//———————————————————————————————————— grfcSetup
function grfcSetup() {
  // first anchor point
  x1 = 0;
  y1 = 0;
  switch (version) {
    case 'a':
      // first control point
      x2 = 0;
      y2 = height;
      // second control point
      x3 = 0;
      y3 = height;
      break;
    case 'b':
      // first control point
      x2 = width;
      y2 = 0;
      // second control point
      x3 = width;
      y3 = height;
      break;
    case 'c':
      // first control point
      x2 = 0;
      y2 = height / 2;
      // second control point
      x3 = width;
      y3 = height / 2;
      break;
    case 'd':
      // first control point
      x2 = 0;
      y2 = height;
      // second control point
      x3 = width;
      y3 = height;
      break;
  }
  // second anchor point
  x4 = width;
  y4 = 0;
}

//———————————————————————————————————— grfcDraw
function grfcDraw() {
  noFill();
  stroke(color(clrs['main']));
  strokeWeight(SW);
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);

  //animation
  percent = ((frameCount % (totalFrames)) / (totalFrames));
  percent = easeInOutQuad(percent) * 4;

  versionMain(percent);
  switch (version) {
    case 'a':
      versionA(percent);
      break;
    case 'b':
      versionB(percent);
      break;
    case 'c':
      versionC(percent);
      break;
    case 'd':
      versionD(percent);
      break;
  }
}

//———————————————————————————————————— easing
function easeInOutQuad(t) {
  return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}