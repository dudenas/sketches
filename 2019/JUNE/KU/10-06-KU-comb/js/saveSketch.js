let facebookCanvas, desktopCanvas, instaCanvas
let minLenPath = 25

let saveClrs = [
  [45, 100, 85],
  [235, 75, 80],
  [5, 80, 100],
]

// FB 820 x 360
// Desktop 1920 x 1080
// Insta 540 x 540

function setupSaveCanvas() {
  facebookCanvas = createGraphics(820, 360).colorMode(HSB)
  desktopCanvas = createGraphics(1920, 1080).colorMode(HSB)
  instaCanvas = createGraphics(540, 540).colorMode(HSB)
}

//————————————————————————————————————————————————————————————————————————————————— FACEBOOK
function saveFacebook() {
  let fbRes = 820 / width
  let fbYpadd = (height - 360 * fbRes) / 2
  facebookCanvas.blendMode(NORMAL)
  facebookCanvas.background(232, 72, 72).noStroke().blendMode(DARKEST);
  for (let particle of particles) {
    let len = particle.path.length
    if (len > minLenPath) {
      let r = particle.r;
      for (let i = 0; i < len; i++) {
        let ind = particle.path[i];
        let temp = map(i, 0, len, 0, 1)
        let alphaGrad = map(pow(temp, 6), 0, 1, 72, 0);
        let x = ind.x;
        let y = ind.y;

        facebookCanvas.fill(232, 72, alphaGrad);
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
  desktopCanvas.background(232, 72, 72).noStroke().blendMode(DARKEST);;
  for (let particle of particles) {
    let r = particle.r;
    let len = particle.path.length
    if (len > minLenPath) {
      for (let i = 0; i < len; i++) {
        let ind = particle.path[i];
        let temp = map(i, 0, len, 0, 1)
        let alphaGrad = map(pow(temp, 6), 0, 1, 72, 0);
        let x = ind.x;
        let y = ind.y;

        desktopCanvas.fill(232, 72, alphaGrad);
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
  instaCanvas.background(232, 72, 72).noStroke().blendMode(DARKEST);;
  for (let particle of particles) {
    let r = particle.r;
    let len = particle.path.length
    if (len > minLenPath) {
      for (let i = 0; i < len; i++) {
        let ind = particle.path[i];
        let temp = map(i, 0, len, 0, 1)
        let alphaGrad = map(pow(temp, 6), 0, 1, 72, 0);
        let x = ind.x;
        let y = ind.y;

        instaCanvas.fill(232, 72, alphaGrad);
        instaCanvas.ellipse(x * instaRes - instaXpadd, y * instaRes, r * instaRes);
      }
    }
  }
  save(instaCanvas, 'KU-graphics-insta.jpg')
}