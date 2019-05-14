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

  var radio = document.getElementsByName('currSituation');
  for (var j = 0; j < radio.length; j++) {
    radio[j].onclick = () => {
      for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
          currSituation = i
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