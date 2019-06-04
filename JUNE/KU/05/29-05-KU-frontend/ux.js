let showColor = false
let showSave = false
let showMenu = false;

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

// expand desktop
function expandwitch() {
  let top = document.querySelector(".menu-outer-top");
  let bot = document.querySelector(".menu-outer-bot");
  if (!showMenu) {
    top.style.left = "calc(var(--menu-width) / 5 * 4 * -1)"
    bot.style.left = "calc(var(--menu-width) / 5 * 4 * -1)"
  } else {
    top.style.left = "0px"
    bot.style.left = "0px"
  }

  showMenu = !showMenu
}