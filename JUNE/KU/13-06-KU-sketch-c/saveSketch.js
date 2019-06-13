let grfcCanvas
let minLenPath = 25
let interpolate = 5

// Save clrs
let saveClrs = [
  [0, 0, 100],
  [45, 100, 85],
  [235, 75, 80],
  [5, 80, 100],
]

let grfcBlack = true
let currClr = 2

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
      for (let i = 0; i < len - 2; i++) {
        let a = particle.path[i];
        let b = particle.path[i + 1];
        let tempA = map(i, 0, len, 0, 1)
        let tempB = map(i + 1, 0, len, 0, 1)

        let aValue = calcSat(tempA)
        let bValue = calcSat(tempB)

        let xa = a.x;
        let ya = a.y;
        let xb = b.x;
        let yb = b.y;

        if (Math.abs(ya - yb) < 10) {
          grfcCanvas.strokeWeight(r * res)
          grfcCanvas.noFill()
          for (let j = 0; j < interpolate - 1; j++) {
            let x1 = map(j, 0, interpolate - 1, xa, xb)
            let y1 = map(j, 0, interpolate - 1, ya, yb)
            let x2 = map(j + 1, 0, interpolate - 1, xa, xb)
            let y2 = map(j + 1, 0, interpolate - 1, ya, yb)
            let sat = map(j, 0, interpolate - 1, aValue[0], bValue[0])
            let bri = map(j, 0, interpolate - 1, aValue[1], bValue[1])
            grfcCanvas.stroke(saveClrs[currClr][0], sat, bri);
            grfcCanvas.beginShape()
            grfcCanvas.vertex(x1 * res, y1 * res);
            grfcCanvas.vertex(x2 * res, y2 * res);
            grfcCanvas.endShape()
          }

        }
      }
    }
  }
  save(grfcCanvas, 'KU-graphics-grfc.jpg')
  grfcCanvas.clear()
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