let showColor = true
let showSave = true
let showMenu = false;
let showData = false;

//—————————————————————————————————————————————————————— MODAL
let mainGrfc = document.querySelector("#main")
//—————————————————————————————————————————————————————— GRAPH
let modalGraph = document.querySelector("#modal-graph")
//—————————————————————————————————————————————————————— ABOUT
let modalAbout = document.querySelector("#modal-about")
//—————————————————————————————————————————————————————— DATE
let modalDate = document.querySelector("#modal-date")
//—————————————————————————————————————————————————————— BURGER MENU
let modalBurgerOpen = document.querySelector("#modal-burger-open")
let modalBurgerClose = document.querySelector("#modal-burger-close")
// show hide
modalBurgerClose.addEventListener('click', () => {
  modalBurgerOpen.style.display = "block"
  modalBurgerClose.style.display = "none"
  $('.mobile-menu')
    .removeClass('mobile-menu-show').addClass('mobile-menu-hidden')
  $('.menu-outer-top')
    .removeClass('mobile-menu-show').addClass('mobile-menu-hidden')
  if (stage < 3) {
    document.getElementById('intro').style.display = 'block';
    mainGrfc.style.filter = 'blur(var(--blur-amount))';
    mainGrfc.style.transform = 'scale(1.4, 1.4)';
  }
  setTimeout(() => {
    document.querySelector('.menu-outer-top').style.top = '-100vh';
    document.querySelector('.mobile-menu.about').style.marginLeft = '0em';
    document.querySelector('.mobile-menu.language').style.marginRight = '0em'
  }, 100)
})

modalBurgerOpen.addEventListener('click', () => {
  modalBurgerOpen.style.display = "none"
  modalBurgerClose.style.display = "block"
  $('.mobile-menu')
    .removeClass('mobile-menu-hidden').addClass('mobile-menu-show')
  $('.menu-outer-top')
    .removeClass('mobile-menu-hidden').addClass('mobile-menu-show')
  if (stage < 3) {
    mainGrfc.style.filter = 'blur(0px)'
    mainGrfc.style.transform = 'scale(1, 1)';
    document.getElementById('intro').style.display = 'none';
  }
  setTimeout(() => {
    document.querySelector('.menu-outer-top').style.top = '0vh';
    document.querySelector('.mobile-menu.about').style.marginLeft = '5em'
    document.querySelector('.mobile-menu.language').style.marginRight = '5em'
  }, 100)

})

//—————————————————————————————————————————————————————— MOBILE hide data
document.querySelector('#expand-mobile').addEventListener('click', () => {
  let bot = document.querySelector(".menu-outer-bot");
  let expBtn = document.querySelector("#expand-mobile");
  if (!showData) {
    let newVal = "var(--menu-bot-mobile) / 5"
    bot.style.bottom = `calc(${newVal} * -4)`
    expBtn.style.bottom = `calc(${newVal} + var(--main-diff))`
  } else {
    bot.style.bottom = "0px"
    expBtn.style.bottom = "calc(var(--menu-bot-mobile) + var(--main-diff))"
  }
  showData = !showData
})

//—————————————————————————————————————————————————————— GRAPH
// open graph
document.querySelector("#graph").addEventListener('click', () => {
  modalGraph.style.display = "block"
  mainGrfc.style.filter = "blur(var(--blur-amount))"
  chart.destroy();
  chart = new Chart(ctx, config)
});
// close graph
document.querySelector("#modal-graph-close").addEventListener('click', () => {
  modalGraph.style.display = "none"
  mainGrfc.style.filter = "blur(0px)"
})

//—————————————————————————————————————————————————————— ABOUT
// open about
document.querySelectorAll(".about").forEach(elm => {
  elm.addEventListener('click', () => {
    modalAbout.style.display = "block"
  })
});
// close about
document.querySelector("#modal-about-close").addEventListener('click', () => {
  modalAbout.style.display = "none"
})

//—————————————————————————————————————————————————————— DATE
// open date
document.querySelector("#date").addEventListener('click', () => {
  modalDate.style.display = "block"
  mainGrfc.style.filter = "blur(var(--blur-amount))"
});

// close date
document.querySelector("#modal-date-close").addEventListener('click', () => {
  modalDate.style.display = "none"
  mainGrfc.style.filter = "blur(0px)"
})

//—————————————————————————————————————————————————————— MENU
//—————————————————————————————————————————————————————— color switch
function colorSwitch() {
  if (stage == 3) {
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
}

//—————————————————————————————————————————————————————— save switch
function saveSwitch() {
  if (stage == 3) {
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
}

//—————————————————————————————————————————————————————— NAVIGATION
//—————————————————————————————————————————————————————— expand desktop
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

//—————————————————————————————————————————————————————— JQUERY
//—————————————————————————————————————————————————————— DATE
// get time
$(document).ready(function () {
  $(".modal-content-date-time div").on("click", function () {
    if (
      $(this)
      .next("ul")
      .hasClass("closed")
    ) {
      $(".modal-content-date-time ul.opened")
        .addClass('closed').removeClass('opened')
        .hide();
      $(this)
        .next("ul")
        .addClass('opened').removeClass('closed')
        .show();
      // rotate the icon
      $(this)
        .find("img")
        .addClass('arrow-up').removeClass('arrow-down')
    } else {
      $(this)
        .next("ul")
        .addClass('closed').removeClass('opened')
        .hide();
      $(this)
        .find("img")
        .addClass('arrow-down').removeClass('arrow-up')
    }
  });

  // update time
  $(".modal-content-date-time ul li").on("click", updateTime);
});

function updateTime() {
  $(this)
    .parent('ul')
    .prev('div')
    .find("img")
    .addClass('arrow-down').removeClass('arrow-up')

  $(this)
    .parent("ul")
    .addClass('closed').removeClass('opened')
    .hide()
    .parents(".time")
    .find(".time-title")
    .text($(this).text());
}

// CLOCK
function showTime() {
  var today = new Date();
  document.querySelector('.data-time-target').innerHTML =
    today.toLocaleTimeString("en-GB")
  setTimeout(showTime, 1000);
}
showTime()