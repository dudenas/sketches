let showColor = false
let showSave = false

// color switch
function colorSwitch() {
  let elements = document.querySelectorAll(".showColor");
  elements.forEach(elm => {
    if (!showColor) {
      elm.style.display = "none"
    } else {
      elm.style.display = "block"
    }
  })

  if (showColor) {
    showSave = false
    saveSwitch()
  }
  showColor = !showColor
}

colorSwitch()

// color switch
function saveSwitch() {
  let elements = document.querySelectorAll(".showSave");
  elements.forEach(elm => {
    if (!showSave) {
      elm.style.display = "none"
    } else {
      elm.style.display = "block"
    }
  })

  if (showSave) {
    showColor = false
    colorSwitch()
  }
  showSave = !showSave
}

saveSwitch()