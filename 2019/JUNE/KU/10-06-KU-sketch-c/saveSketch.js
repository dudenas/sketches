let grfcCanvas
let minLenPath = 25

// Save clrs
let saveClrs = [
  [0, 0, 100],
  [45, 100, 85],
  [235, 75, 80],
  [5, 80, 100],
]

let grfcBlack = true
let currClr = 0

// style clrs UI
let clrs = [
  [255, 255, 255],
  [215, 170, 0],
  [50, 65, 185],
  [255, 75, 50], 0, 255, [255, 0, 85]
];

let bgClr = clrs[currClr]
let grfcClr = grfcBlack ? clrs[4] : clrs[5]
let res = 1

//————————————————————————————————————————————————————————————————————————————————— FACEBOOK
function saveGrfc() {
  grfcCanvas = createGraphics(width * res, height * res).colorMode(HSB)
  grfcCanvas.blendMode(NORMAL)
  grfcCanvas.background(saveClrs[currClr][0], saveClrs[currClr][1], saveClrs[currClr][2]).noStroke()

  if (grfcBlack) grfcCanvas.blendMode(DARKEST)
  else grfcCanvas.blendMode(LIGHTEST)

  for (let particle of particles) {
    let len = particle.path.length
    if (len > minLenPath) {
      let r = particle.r;
      for (let i = 0; i < len - 1; i++) {
        let ind = particle.path[i];
        let temp = map(i, 0, len, 0, 1)

        let clrValue = calcSat(temp)

        let x = ind.x;
        let y = ind.y;

        grfcCanvas.fill(saveClrs[currClr][0], clrValue[0], clrValue[1]);
        grfcCanvas.ellipse(x * res, y * res, r * res);
      }
    }
  }
  save(grfcCanvas, 'KU-graphics-grfc.jpg')
}

//————————————————————————————————————————————————————————————————————————————————— calcSat
function calcSat(temp) {
  let sat = saveClrs[currClr][1]
  let bri = map(pow(temp, 1), 0, 1, saveClrs[currClr][2], 0);
  if (!grfcBlack) {
    sat = map(pow(temp, 1), 0, 1, saveClrs[currClr][1], 0);
    bri = map(pow(temp, 1), 0, 1, saveClrs[currClr][2], 100);
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
  // SAVE
  if (key == 's' || key == 'S') {
    saveFunction(saveGrfc)
  }

  // next color
  if (key == 'n' || key == 'N') {
    currClr = (currClr + 1) % 3
    bgClr = clrs[currClr]
  }
  // diff grfc clr
  if (key == 'm' || key == 'M') {
    grfcBlack = !grfcBlack
    grfcClr = grfcBlack ? clrs[4] : clrs[5]
    background(grfcClr, 255)
  }
}