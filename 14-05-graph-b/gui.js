let cristianChecked = false,
  cristianActive = false,
  practisingChecked = false,
  practisingActive = false,
  educationChecked = false,
  educationActive = false,
  sexChecked = false,
  sexActive = false,
  showDuration = false,
  showAge = true

function guiSetup() {
  // situation
  select('#situation')
    .changed(() => {
      situation = !situation
      redraw()
    });

  select('#individual')
    .changed(() => {
      individualSituation = !individualSituation
      resetRadioButtons()
      redraw()
    });

  var radio = document.getElementsByName('currSituation');
  for (var j = 0; j < radio.length; j++) {
    radio[j].onclick = () => {
      for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
          currSituation = i
          resetRadioButtons()
          redraw()
          break
        }
      }
    }
  }

  // current question
  var radioQuestion = document.getElementsByName('currQuestion');
  for (var j = 0; j < radioQuestion.length; j++) {
    radioQuestion[j].onclick = () => {
      for (var i = 0; i < radioQuestion.length; i++) {
        if (radioQuestion[i].checked) {
          currQuestion = i
          redraw()
          break
        }
      }
    }
  }

  // value buttons
  select('#cristian')
    .changed(() => {
      cristianChecked = !cristianChecked
      redraw()
    });

  select('#practising')
    .changed(() => {
      practisingChecked = !practisingChecked
      redraw()
    });

  select('#sex')
    .changed(() => {
      sexChecked = !sexChecked
      redraw()
    });

  select('#education')
    .changed(() => {
      educationChecked = !educationChecked
      redraw()
    });

  select('#cristian_active')
    .changed(() => {
      cristianActive = !cristianActive
      redraw()
    });

  select('#education_active')
    .changed(() => {
      educationActive = !educationActive
      redraw()
    });

  select('#sex_active')
    .changed(() => {
      sexActive = !sexActive
      redraw()
    });

  select('#practising_active')
    .changed(() => {
      practisingActive = !practisingActive
      redraw()
    });

  select('#duration_active')
    .changed(() => {
      showDuration = !showDuration
      redraw()
    });

  select('#age_active')
    .changed(() => {
      showAge = !showAge
      redraw()
    });


  // save button
  select('#saveButton')
    .mouseClicked(saveFrame);


  // input values
  let input = select('.input_name')
    .changed(() => {
      txt = input.value();
      redraw()
    });
}

function conditionDraw(cristian, practising, sex, education) {
  let condition = 0
  if (cristianActive) {
    if (cristianChecked == cristian) {
      condition++
    }
  }
  if (practisingActive) {
    if (practisingChecked == practising) {
      condition++
    }
  }
  if (sexActive) {
    if (sexChecked == sex) {
      condition++
    }
  }
  if (educationActive) {
    if (educationChecked == education) {
      condition++
    }
  }
  return condition
}

function resetRadioButtons() {
  let sit = data[0]['sit'][currSituation]
  // for the first time define the question lenth and set the first values
  let questions = sit.length
  for (let i = 0; i < 7; i++) {
    if (i + 1 > questions) {
      document.getElementsByClassName('currQuestion-div')[(i + 1) * 2 - 2].setAttribute('style', 'display:none')
      document.getElementsByClassName('currQuestion-div')[(i + 1) * 2 - 1].setAttribute('style', 'display:none')
    } else {
      document.getElementsByName('currQuestion')[i].checked = false
      document.getElementsByClassName('currQuestion-div')[(i + 1) * 2 - 2].setAttribute('style', 'display:true')
      document.getElementsByClassName('currQuestion-div')[(i + 1) * 2 - 1].setAttribute('style', 'display:true')
    }
  }
  document.getElementsByName('currQuestion')[0].checked = true
  currQuestion = 0
}