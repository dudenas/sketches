//—————————————————————————————————————————————————————— DATE
// close date chosen
document.querySelector("#modal-date-btn").addEventListener('click', () => {
  modalDate.style.display = "none"
  mainGrfc.style.filter = "blur(0px)"
  mainGrfc.style.transform = "scale(1, 1)"
  if (!is_mobile) expandMenu()
  else expandMobile()
  // UPDATE PARAMETERS 
  YEAR = tempYear
  MONTH = tempMonth
  DAY = tempDay

  month = data[YEAR][MONTH]
  day = month[DAY]
  setFirstValues = true
  setNewModalData = true

  document.querySelectorAll(".data-date-target").forEach(elm => {
    elm.innerHTML = `${YEAR} ${nf(MONTH,2,0)} ${nf(DAY,2,0)}`
  })
})

//—————————————————————————————————————————————————————— DOCUMENT READY
// functionality
$(document).ready(function () {
  // SAVE 
  $('#saveDesktop').click(() => saveFunction(saveDesktop))
  $('#saveMobile').click(() => saveFunction(saveMobile))
  $('#saveInsta').click(() => saveFunction(saveInsta))
  $('#saveFacebook').click(() => saveFunction(saveFacebook))
  // PLAY 
  $('#play').click(() => changeRunning())

  // LANGUAGE
  // set first language to lithuanian / remove en spans
  $("span:lang(en)").addClass('language-hide')
  $("span:lang(lt)").addClass('language-show')

  $('.language a').click(function (e) {
    e.preventDefault()
    if (this.className.split(/\s+/)[0] == 'lt') {
      $('.en').addClass('language-passive').removeClass('language-active')
      document.documentElement.setAttribute('lang', 'lt')
      $("span:lang(lt)").addClass('language-show').removeClass('language-hide')
      $("span:lang(en)").addClass('language-hide').removeClass('language-show')
    } else {
      $('.lt').addClass('language-passive').removeClass('language-active')
      document.documentElement.setAttribute('lang', 'en')
      $("span:lang(en)").addClass('language-show').removeClass('language-hide')
      $("span:lang(lt)").addClass('language-hide').removeClass('language-show')
    }
    $(this).addClass('language-active').removeClass('language-passive')
  })
  // CLRS
  $('.btn-clr').click(function (e) {
    e.preventDefault();
    let myClass = this.className.split(/\s+/)
    switch (myClass[1]) {
      case 'grfc-black':
        grfcBlack = true
        grfcClr = grfcBlack ? clrs[3] : clrs[4]
        background(grfcClr, 255)
        break;
      case 'grfc-white':
        grfcBlack = false
        grfcClr = grfcBlack ? clrs[3] : clrs[4]
        background(grfcClr, 255)
        break;
    }

    switch (myClass[2]) {
      case 'bg-blue':
        currClr = 1;
        break;
      case 'bg-red':
        currClr = 2;
        break;
      case 'bg-yellow':
        currClr = 0;
        break;
    }
    // update background
    bgClr = clrs[currClr]

    // change higlighted
    $(".btn-clr").addClass('btn-clr-passive').removeClass('btn-clr-active')
    $(this).addClass('btn-clr-active').removeClass('btn-clr-passive')

    return false;
  });
});

// KEYPRESSED
function changeRunning() {
  if (running) {
    running = false
    document.querySelector('.play-button').style.display = 'none'
    document.querySelector('.stop-button').style.display = 'block'
  } else {
    running = true
    document.querySelector('.play-button').style.display = 'block'
    document.querySelector('.stop-button').style.display = 'none'
  }
}