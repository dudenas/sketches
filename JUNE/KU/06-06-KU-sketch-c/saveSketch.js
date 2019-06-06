let facebookCanvas, desktopCanvas, instaCanvas, mobileCanvas
let minLenPath = 25

// Save clrs
let saveClrs = [
  [45, 100, 85],
  [235, 75, 80],
  [5, 80, 100],
]

let grfcBlack = false
let currClr = 0

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

function setupSaveCanvas() {
  facebookCanvas = createGraphics(820, 360).colorMode(HSB)
  desktopCanvas = createGraphics(1920, 1080).colorMode(HSB)
  instaCanvas = createGraphics(540, 540).colorMode(HSB)
  mobileCanvas = createGraphics(windowWidth, windowHeight).colorMode(HSB)
}

//————————————————————————————————————————————————————————————————————————————————— FACEBOOK
function saveFacebook() {
  let fbRes = 820 / width
  let fbYpadd = (height - 360 * fbRes) / 2
  facebookCanvas.blendMode(NORMAL)
  facebookCanvas.background(saveClrs[currClr][0], saveClrs[currClr][1], saveClrs[currClr][2]).noStroke()

  if (grfcBlack) facebookCanvas.blendMode(DARKEST)
  else facebookCanvas.blendMode(LIGHTEST)

  for (let particle of particles) {
    let len = particle.path.length
    if (len > minLenPath) {
      let r = particle.r;
      for (let i = 0; i < len; i++) {
        let ind = particle.path[i];
        let temp = map(i, 0, len, 0, 1)

        let clrValue = calcSat(temp)

        let x = ind.x;
        let y = ind.y;

        facebookCanvas.fill(saveClrs[currClr][0], clrValue[0], clrValue[1]);
        facebookCanvas.ellipse(x * fbRes, y * fbRes - fbYpadd, r * fbRes);
      }
    }
  }
  save(facebookCanvas, 'KU-graphics-fb-cover.jpg')
}

//————————————————————————————————————————————————————————————————————————————————— DESKTOP
function saveDesktop() {
  let desktopRes = 1920 / width
  desktopCanvas.blendMode(NORMAL)
  desktopCanvas.background(saveClrs[currClr][0], saveClrs[currClr][1], saveClrs[currClr][2]).noStroke()

  if (grfcBlack) desktopCanvas.blendMode(DARKEST)
  else desktopCanvas.blendMode(LIGHTEST)

  for (let particle of particles) {
    let r = particle.r;
    let len = particle.path.length
    if (len > minLenPath) {
      for (let i = 0; i < len; i++) {
        let ind = particle.path[i];
        let temp = map(i, 0, len, 0, 1)


        let clrValue = calcSat(temp)

        let x = ind.x;
        let y = ind.y;

        desktopCanvas.fill(saveClrs[currClr][0], clrValue[0], clrValue[1]);
        desktopCanvas.ellipse(x * desktopRes, y * desktopRes, r * desktopRes);
      }
    }
  }
  save(desktopCanvas, 'KU-graphics-desktop.jpg')
}

//————————————————————————————————————————————————————————————————————————————————— INSTA
function saveInsta() {
  let instaRes = 540 / height
  let instaXpadd = (width - 540 * instaRes) / 2
  instaCanvas.blendMode(NORMAL)
  instaCanvas.background(saveClrs[currClr][0], saveClrs[currClr][1], saveClrs[currClr][2]).noStroke()

  if (grfcBlack) instaCanvas.blendMode(DARKEST)
  else instaCanvas.blendMode(LIGHTEST)

  for (let particle of particles) {
    let r = particle.r;
    let len = particle.path.length
    if (len > minLenPath) {
      for (let i = 0; i < len; i++) {
        let ind = particle.path[i];
        let temp = map(i, 0, len, 0, 1)

        let clrValue = calcSat(temp)

        let x = ind.x;
        let y = ind.y;

        instaCanvas.fill(saveClrs[currClr][0], clrValue[0], clrValue[1]);
        instaCanvas.ellipse(x * instaRes - instaXpadd, y * instaRes, r * instaRes);
      }
    }
  }
  save(instaCanvas, 'KU-graphics-insta.jpg')
}


//————————————————————————————————————————————————————————————————————————————————— INSTA
function saveMobile() {
  let mobileRes = windowHeight / height
  let mobileXPadd = Math.abs(width - mobileCanvas.width * mobileRes) / 2
  let mobileYPadd = 0
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
    let r = particle.r;
    let len = particle.path.length
    if (len > minLenPath) {
      for (let i = 0; i < len; i++) {
        let ind = particle.path[i];
        let temp = map(i, 0, len, 0, 1)

        let clrValue = calcSat(temp)

        let x = ind.x;
        let y = ind.y;

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
  let bri = map(pow(temp, 6), 0, 1, saveClrs[currClr][2], 0);
  if (!grfcBlack) {
    sat = map(pow(temp, 6), 0, 1, saveClrs[currClr][1], 0);
    bri = map(pow(temp, 6), 0, 1, saveClrs[currClr][2], 100);
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
  if (key == ' ') {
    debug = !debug;
  }

  if (key == 's' || key == 'S') {
    showCurrent = !showCurrent;
  }

  // SAVE
  if (key == 'q' || key == 'Q') {
    saveFunction(saveInsta)
  }
  if (key == 'w' || key == 'W') {
    saveFunction(saveFacebook)
  }
  if (key == 'e' || key == 'E') {
    saveFunction(saveDesktop)
  }
  if (key == 'r' || key == 'R') {
    saveFunction(saveMobile)
  }

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