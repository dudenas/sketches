let minLenPath = 25

// Save clrs
let saveClrs = [
  [45, 100, 85],
  [235, 75, 80],
  [5, 80, 100],
]

let grfcBlack = true
let currClr = 1

// style clrs UI
let clrs = [
  [215, 170, 0],
  [50, 65, 185],
  [255, 75, 50], 0, 255, [255, 0, 85]
];

let bgClr = clrs[currClr]
let grfcClr = grfcBlack ? clrs[3] : clrs[4]


// FB 820 x 360
// Desktop 1920 x 1080
// Insta 540 x 540

//————————————————————————————————————————————————————————————————————————————————— FACEBOOK
function saveFacebook() {
  const facebookCanvas = createGraphics(820, 360).colorMode(HSB)
  const fbRes = 820 / width
  const fbYpadd = (height - 360 * fbRes) / 2
  facebookCanvas.blendMode(NORMAL)
  facebookCanvas.background(saveClrs[currClr][0], saveClrs[currClr][1], saveClrs[currClr][2]).noStroke()

  if (grfcBlack) facebookCanvas.blendMode(DARKEST)
  else facebookCanvas.blendMode(LIGHTEST)

  for (let particle of particles) {
    const len = particle.path.length
    if (len > minLenPath) {
      const r = particle.r;
      for (let i = 0; i < len - 1; i++) {
        const a = particle.path[i];
        const b = particle.path[i + 1];
        const temp = map(i + 1, 0, len, 0, 1)

        const clrValue = calcSat(temp)

        const xa = a.x;
        const ya = a.y;
        const xb = b.x;
        const yb = b.y;

        if (Math.abs(ya - yb) < 10 && Math.abs(xa - xb) < 10) {
          facebookCanvas.stroke(saveClrs[currClr][0], clrValue[0], clrValue[1]);
          facebookCanvas.strokeWeight(r * fbRes)
          facebookCanvas.noFill()
          facebookCanvas.line(xa * fbRes, ya * fbRes - fbYpadd, xb * fbRes, yb * fbRes - fbYpadd);
        }
      }
    }
  }
  save(facebookCanvas, 'KU-graphics-fb-cover.jpg')
}

//————————————————————————————————————————————————————————————————————————————————— DESKTOP
function saveDesktop() {
  const desktopCanvas = createGraphics(1920, 1080).colorMode(HSB)
  const desktopRes = 1920 / width
  desktopCanvas.blendMode(NORMAL)
  desktopCanvas.background(saveClrs[currClr][0], saveClrs[currClr][1], saveClrs[currClr][2]).noStroke()

  if (grfcBlack) desktopCanvas.blendMode(DARKEST)
  else desktopCanvas.blendMode(LIGHTEST)

  for (let particle of particles) {
    const r = particle.r;
    const len = particle.path.length
    if (len > minLenPath) {
      for (let i = 0; i < len - 1; i++) {
        const a = particle.path[i];
        const b = particle.path[i + 1];
        const temp = map(i + 1, 0, len, 0, 1)

        const clrValue = calcSat(temp)

        const xa = a.x;
        const ya = a.y;
        const xb = b.x;
        const yb = b.y;

        if (Math.abs(ya - yb) < 10 && Math.abs(xa - xb) < 10) {
          desktopCanvas.stroke(saveClrs[currClr][0], clrValue[0], clrValue[1]);
          desktopCanvas.strokeWeight(r * desktopRes)
          desktopCanvas.noFill()
          desktopCanvas.line(xa * desktopRes, ya * desktopRes, xb * desktopRes, yb * desktopRes);
        }
      }
    }
  }
  save(desktopCanvas, 'KU-graphics-desktop.jpg')
}

//————————————————————————————————————————————————————————————————————————————————— INSTA
function saveInsta() {
  const instaCanvas = createGraphics(540, 540).colorMode(HSB)
  const instaRes = 540 / height
  const instaXpadd = (width - 540 * instaRes) / 2
  instaCanvas.blendMode(NORMAL)
  instaCanvas.background(saveClrs[currClr][0], saveClrs[currClr][1], saveClrs[currClr][2]).noStroke()

  if (grfcBlack) instaCanvas.blendMode(DARKEST)
  else instaCanvas.blendMode(LIGHTEST)

  for (let particle of particles) {
    const r = particle.r;
    const len = particle.path.length
    if (len > minLenPath) {
      for (let i = 0; i < len - 1; i++) {
        const a = particle.path[i];
        const b = particle.path[i + 1];
        const temp = map(i + 1, 0, len, 0, 1)

        const clrValue = calcSat(temp)

        const xa = a.x;
        const ya = a.y;
        const xb = b.x;
        const yb = b.y;

        if (Math.abs(ya - yb) < 10 && Math.abs(xa - xb) < 10) {
          instaCanvas.stroke(saveClrs[currClr][0], clrValue[0], clrValue[1]);
          instaCanvas.strokeWeight(r * instaRes)
          instaCanvas.noFill()
          instaCanvas.line(xa * instaRes - instaXpadd, ya * instaRes, xb * instaRes - instaXpadd, yb * instaRes)
        }
      }
    }
  }
  save(instaCanvas, 'KU-graphics-insta.jpg')
}


//————————————————————————————————————————————————————————————————————————————————— INSTA
function saveMobile() {
  const mobileCanvas = createGraphics(windowWidth, windowHeight).colorMode(HSB)
  const mobileRes = windowHeight / height
  const mobileXPadd = Math.abs(width - mobileCanvas.width * mobileRes) / 2
  const mobileYPadd = 0
  if (windowWidth > windowHeight) {
    if (windowWidth / width > windowHeight / height) {
      mobileRes = mobileCanvas.width / width
      mobileXPadd = 0
      mobileYPadd = 0
    }
  }
  mobileCanvas.blendMode(NORMAL)
  mobileCanvas.background(saveClrs[currClr][0], saveClrs[currClr][1], saveClrs[currClr][2]).noStroke()

  if (grfcBlack) mobileCanvas.blendMode(DARKEST)
  else mobileCanvas.blendMode(LIGHTEST)

  for (let particle of particles) {
    const r = particle.r;
    const len = particle.path.length
    if (len > minLenPath) {
      for (let i = 0; i < len; i++) {
        const ind = particle.path[i];
        const temp = map(i, 0, len, 0, 1)

        const clrValue = calcSat(temp)

        const x = ind.x;
        const y = ind.y;

        mobileCanvas.fill(saveClrs[currClr][0], clrValue[0], clrValue[1]);
        mobileCanvas.ellipse(x * mobileRes - mobileXPadd, y * mobileRes - mobileYPadd, r * mobileRes);
      }
    }
  }
  save(mobileCanvas, 'KU-graphics-mobile.jpg')
}

//————————————————————————————————————————————————————————————————————————————————— calcSat
function calcSat(temp) {
  let sat = saveClrs[currClr][1]
  let bri = map(pow(temp, 2), 0, 1, saveClrs[currClr][2], 0);
  if (!grfcBlack) {
    sat = map(pow(temp, 2), 0, 1, saveClrs[currClr][1], 0);
    bri = map(pow(temp, 2), 0, 1, saveClrs[currClr][2], 100);
  }

  return [sat, bri]
}

//————————————————————————————————————————————————————————————————————————————————— saveFunctions
function saveFunction(fnct) {
  return new Promise(resolve => {
    resolve(document.getElementById('loading').style.display = 'flex')
  }).then(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(fnct()), 100)
    })
  }).then(() => {
    document.getElementById('loading').style.display = 'none'
  })
}

//————————————————————————————————————————————————————————————————————————————————— helpFunctions
function keyPressed() {
  if (key == 's' || key == 'S') {
    showCurrent = !showCurrent;
  }

  // SAVE
  // if (key == 'q' || key == 'Q') {
  //   saveFunction(saveInsta)
  // }
  // if (key == 'w' || key == 'W') {
  //   saveFunction(saveFacebook)
  // }
  // if (key == 'e' || key == 'E') {
  //   saveFunction(saveDesktop)
  // }
  // if (key == 'r' || key == 'R') {
  //   saveFunction(saveMobile)
  // }

  // next color
  if (key == 'n' || key == 'N') {
    currClr = (currClr + 1) % 3
    bgClr = clrs[currClr]
  }
  // diff grfc clr
  if (key == 'm' || key == 'M') {
    grfcBlack = !grfcBlack
    grfcClr = grfcBlack ? clrs[3] : clrs[4]
    background(grfcClr, 255)
  }
}