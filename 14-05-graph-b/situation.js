let situations = ['situation 1', 'situation 2', 'situation 3', 'situation 4']
let currSituation = 0

function situationDraw() {
  // calculate max value and set values
  let maxValue = 7
  let minValue = 1
  let value = {}
  let questions = 0
  let count = 0

  let toPick = cristianActive + practisingActive + sexActive + educationActive

  for (let i = 0; i < len; i++) {
    let id = data[i]
    // about
    let cristian = id['about']['cristian']
    let practising = id['about']['practising']
    let sex = id['about']['sex']
    let education = id['about']['education']

    // situations
    let sit = id['sit'][currSituation]
    // for the first time define the question lenth and set the first values
    if (questions == 0) {
      questions = sit.length
      for (let q = 0; q < questions; q++) {
        value[q] = 0
      }
    }

    // get condition
    let condition = conditionDraw(cristian, practising, sex, education)

    // if condition met
    if (condition == toPick) {
      // set values for each question
      for (let q = 0; q < questions; q++) {
        value[q] += sit[q]
      }
      count++
    }
  }
  // avarage values
  for (let q = 0; q < questions; q++) {
    value[q] /= count
  }


  // draw graph
  background(clrs[0])
  textAlign(CENTER, CENTER)
  textSize(24)
  noStroke()
  fill(clrs[1])
  text(txt, width / 2, height / 10)
  textSize(18)
  text(`${situations[currSituation]} | total — ${count}`, width / 2, height / 10 + txtpadd * 2)


  for (let i = 0; i < questions; i++) {
    let val = value[i]
    let y = map(val, minValue, maxValue, height - height / 10, ypadd)
    let x = ((width - xpadd * 2) / questions) * (i) + xpadd * 3
    noStroke()
    fill(clrs[1])
    textSize(8)
    text(nf(val,0,2), x, y - txtpadd)
    
    stroke(clrs[2])
    strokeWeight(4)
    noFill()
    point(x, y)

    stroke(clrs[1], 75)
    strokeWeight(1)
    noFill();
    let ly = height - height / 10
    line(x, ly, x, ly - txtpadd)
    
    noStroke()
    fill(clrs[1])
    textSize(12)
    text(i + 1, x, ly + txtpadd)
  }

  let x = xpadd
  let y1 = ypadd
  let y2 = height - height / 10
  stroke(clrs[1])
  strokeWeight(1)
  noFill();
  line(x, y1, x, y2)

  textSize(12)
  for (let i = 0; i <= maxValue; i++) {
    let y = map(i, minValue, maxValue, height - height / 10, ypadd)
    stroke(clrs[1], 75)
    strokeWeight(1)
    noFill();
    line(x, y, width, y)
    noStroke()
    fill(clrs[1])
    text(i, x - txtpadd, y)
  }
}