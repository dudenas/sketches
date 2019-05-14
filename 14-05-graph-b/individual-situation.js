let currQuestion = 0

function individualSituationDraw() {
  // calculate max value and set values
  let maxValue = 7
  let minValue = 1
  let value = []
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

    // get condition
    let condition = conditionDraw(cristian, practising, sex, education)

    // if condition met
    if (condition == toPick) {
      // set values for each question
      let val = sit[currQuestion]
      value[count] = val
      count++
    }
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


  textSize(8)
  value.sort()
  for (let i = 0; i < count; i++) {
    let val = value[i]
    let y = map(val, minValue, maxValue, height - height / 10, ypadd)
    let x = ((width - xpadd * 2) / count) * (i) + xpadd * 3 / 2
    noStroke()
    fill(clrs[1])
    let up = i % 2 == 0 ? 1 : -1
    push()
    translate(x, y - txtpadd * up)
    text(val, 0, 0)
    pop()

    stroke(clrs[2])
    strokeWeight(4)
    noFill()
    point(x, y)
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