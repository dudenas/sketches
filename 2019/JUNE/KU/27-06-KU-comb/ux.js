let showColor = true
let showSave = true
let showMenu = false;
let showData = false;
let is_mobile = false;
let is_horizontal = false;

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
  if (stage < 3) {
    document.getElementById('intro').style.display = 'block';
    mainGrfc.style.filter = 'blur(var(--blur-amount))';
    mainGrfc.style.transform = 'scale(1.2, 1.2)';
    $('.menu-outer-top')
      .removeClass('mobile-menu-show').addClass('mobile-menu-hidden')
  } else {
    setTimeout(() => {
      $('.menu-outer-top')
        .removeClass('mobile-menu-show').addClass('mobile-menu-hidden')
    }, 300)
  }
  setTimeout(() => {
    document.querySelector('.menu-outer-top').style.top = '-100vh';
    document.querySelector('.mobile-menu.about').style.marginLeft = '0em';
    document.querySelector('.mobile-menu.language').style.marginRight = '0em'
    document.querySelectorAll('.mobile-anim-left').forEach(elm => {
      elm.style.marginLeft = '-2em'
    })
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
    document.querySelectorAll('.mobile-anim-left').forEach(elm => {
      elm.style.marginLeft = '0em'
    })

  }, 100)

})

//—————————————————————————————————————————————————————— MOBILE hide data
document.querySelector('#expand-mobile').addEventListener('click', () => expandMobile())

function expandMobile() {
  let bot = document.querySelector(".menu-outer-bot");
  let expBtn = document.querySelector("#expand-mobile");
  if (!is_horizontal) {
    if (!showData) {
      let newVal = "var(--menu-bot-mobile) / 5"
      bot.style.bottom = `calc(${newVal} * -4)`
      expBtn.style.bottom = `calc(${newVal} + var(--main-diff))`
    } else {
      bot.style.bottom = "0px"
      expBtn.style.bottom = "calc(var(--menu-bot-mobile) + var(--main-diff))"
    }
  } else {
    if (!showData) {
      bot.style.left = `calc(var(--menu-width) * -1)`
      expBtn.style.left = `var(--main-diff)`
    } else {
      bot.style.left = "0px"
      expBtn.style.left = "calc(var(--menu-width))"
    }
  }
  showData = !showData
}


//—————————————————————————————————————————————————————— GRAPH
// open graph
document.querySelector("#graph").addEventListener('click', () => {
  modalGraph.style.display = "block"
  mainGrfc.style.filter = "blur(var(--blur-amount))"
  mainGrfc.style.transform = "scale(1.1, 1.1)"
  expandMenu();
  chart.destroy();
  chart = new Chart(ctx, config)
});
// close graph
document.querySelector("#modal-graph-close").addEventListener('click', () => {
  modalGraph.style.display = "none"
  mainGrfc.style.filter = "blur(0px)"
  mainGrfc.style.transform = "scale(1, 1)"
  expandMenu();
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
  mainGrfc.style.transform = "scale(1.1, 1.1)"
  if (!is_mobile) expandMenu()
  else expandMobile()
});

// close date
document.querySelector("#modal-date-close").addEventListener('click', () => {
  modalDate.style.display = "none"
  mainGrfc.style.filter = "blur(0px)"
  mainGrfc.style.transform = "scale(1, 1)"
  if (!is_mobile) expandMenu()
  else expandMobile()
})

//—————————————————————————————————————————————————————— MENU
//—————————————————————————————————————————————————————— color switch
function colorSwitch() {
  if (introDone) {
    let elements = document.querySelectorAll(".showColor");
    let elementsImg = document.querySelectorAll(".showColor img");
    elements.forEach(elm => {
      if (!showColor) {
        elm.style.display = "none"
      } else {
        elm.style.display = "block"
      }
    })
    setTimeout(() => {
      elementsImg.forEach(elm => {
        if (!showColor) {
          elm.style.height = "2.5em"
        } else {
          elm.style.height = "0"
        }
      })
    }, 25)
    if (showColor) {
      showSave = false
      saveSwitch()
    }
    showColor = !showColor
  }
}

//—————————————————————————————————————————————————————— save switch
function saveSwitch() {
  if (introDone) {
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
function expandMenu() {
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
$(document).ready(function () {
  // isMobile
  if ($('.hide-mobile').css('display') == 'none') {
    is_mobile = true;
    // is horizontal ?
    if ($(document).height() < 550) is_horizontal = true;
  }
  // landscape mode 
  // Listen for orientation changes
  window.addEventListener("orientationchange", function () {
    let bot = document.querySelector(".menu-outer-bot");
    let expBtn = document.querySelector("#expand-mobile");
    if (window.orientation == 90) {
      is_horizontal = true
      bot.style.left = "0px"
      expBtn.style.left = "calc(var(--menu-width))"
    } else {
      is_horizontal = false
      bot.style.bottom = "0px"
      bot.style.left = "0px"
      expBtn.style.bottom = "calc(var(--menu-bot-mobile) + var(--main-diff))"
      expBtn.style.rigth = "var(--main-diff)"
    }
    showData = false;
  }, false);
  //—————————————————————————————————————————————————————— keypressed  
  if (!is_mobile) {
    expandMenu()
    document.body.onkeyup = function (e) {
      e.preventDefault(); // Prevent the default action
      //space pressed
      let currKey = e.keyCode;
      if (currKey === 32) {
        changeRunning()
      }
      //d pressed
      if (currKey === 68) {
        saveFunction(saveDesktop)
      }
      //h pressed
      if (currKey === 72) {
        expandMenu()
      }
    }
  } else {
    expandMobile()
  }


  //—————————————————————————————————————————————————————— DATE
  // get time
  $(".modal-content-date-time div").on("click", function () {
    if (
      $(this)
      .next("ul")
      .hasClass("closed")
    ) {
      $(".modal-content-date-time ul.opened")
        .addClass('closed').removeClass('opened')
        .hide()
        .prev('div')
        .find("img")
        .addClass('arrow-down').removeClass('arrow-up')
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