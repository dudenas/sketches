let individualSituation = false

function informationDraw() {
  // calculate max value and set values
  let maxValue = 0
  let minValue = Infinity
  let avg = 0
  // let value = {}
  let value = []
  let duration = []
  let count = 0

  let toPick = cristianActive + practisingActive + sexActive + educationActive

  for (let i = 0; i < len; i++) {
    let id = data[i]
    // about
    let cristian = id['about']['cristian']
    let practising = id['about']['practising']
    let sex = id['about']['sex']
    let education = id['about']['education']
    let age = id['about']['age']

    // duration
    let dur = nf(id['time']['duration'], 0, 1)

    // get condition
    let condition = conditionDraw(cristian, practising, sex, education)
    if (condition == toPick) {
      value[count] = age
      value.push(age)
      duration.push(dur)
      if (maxValue < age) maxValue = age
      if (minValue > age) minValue = age
      avg += age
      count++
    }
  }
  avg /= count

  // draw graph
  background(clrs[0])
  textAlign(CENTER, CENTER)
  textSize(24)
  noStroke()
  fill(clrs[1])
  text(txt, width / 2, height / 10)
  textSize(18)
  text(`total — ${count} | min — ${minValue} | max — ${maxValue} | avg - ${nf(avg,0,2)}`, width / 2, height / 10 + txtpadd * 2)

  textSize(8)
  // let graphlen = Object.keys(value).length
  let graphlen = value.length
  value.sort()
  for (let i = 0; i < count; i++) {
    let val = value[i]
    let dur = duration[i]
    let y = map(val, 0, maxValue, height - height / 10, ypadd)
    let x = ((width - xpadd * 2) / graphlen) * (i) + xpadd * 3 / 2
    noStroke()
    fill(clrs[1])
    let up = i % 2 == 0 ? 1 : -1
    if (showAge) {
      text(val, x, y - txtpadd * up)
    }
    if (showDuration) {
      push()
      translate(x, y - txtpadd * up * 3)
      rotate(PI / 2)
      text(dur, 0, 0)
      pop()
    }
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
    let y = map(i, 0, maxValue, height - height / 10, ypadd)
    if (i % 5 == 0) {
      stroke(clrs[1], 75)
      strokeWeight(1)
      noFill();
      line(x, y, width, y)
      noStroke()
      fill(clrs[1])
      text(i, x - txtpadd, y)
    }
  }

  // avg line
  let avgY = map(avg, 0, maxValue, height - height / 10, ypadd)
  stroke(clrs[2])
  strokeWeight(1)
  noFill();
  line(x, avgY, width, avgY)
}