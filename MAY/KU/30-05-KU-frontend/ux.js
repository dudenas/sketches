let showColor = true
let showSave = true
let showMenu = false;

// TOOLTIP

// MODAL
let mainGrfc = document.querySelector("#main")
// GRAPH
let modalGraph = document.querySelector("#modal-graph")
// ABOUT
let modalAbout = document.querySelector("#modal-about")
// open graph
document.querySelector("#graph").addEventListener('click', () => {
  modalGraph.style.display = "block"
  mainGrfc.style.filter = "blur(var(--blur-amount))"
});
// close graph
document.querySelector("#modal-graph-close").addEventListener('click', () => {
  modalGraph.style.display = "none"
  mainGrfc.style.filter = "blur(0px)"
})
// open about
document.querySelector("#about").addEventListener('click', () => {
  modalAbout.style.display = "block"
  mainGrfc.style.filter = "blur(var(--blur-amount))"
});
// close about
document.querySelector("#modal-about-close").addEventListener('click', () => {
  modalAbout.style.display = "none"
  mainGrfc.style.filter = "blur(0px)"
})

// MENU
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

// save switch
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

// NAVIGATION
// expand desktop
function expandwitch() {
  let top = document.querySelector(".menu-outer-top");
  let bot = document.querySelector(".menu-outer-bot");
  if (!showMenu) {
    top.style.left = "calc(var(--menu-width) / 10 * 9 * -1)"
    bot.style.left = "calc(var(--menu-width) / 10 * 9 * -1)"
  } else {
    top.style.left = "0px"
    bot.style.left = "0px"
  }

  showMenu = !showMenu
}