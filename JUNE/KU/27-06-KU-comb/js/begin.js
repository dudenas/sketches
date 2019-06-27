let stage = 0;

let nextButton = document.querySelector("#nextButton")
let pageIndex = document.querySelector("#page-index")
let timeToChante = 5000
let introDone = false

// INTRO
nextButton.addEventListener('click', () => {
  changeIntro()
})

// ANIMATION START
$(document).ready(function () {
  document.getElementById('startText').classList.add('slide-in')
  document.getElementById('dataLoading').classList.add('slide-in')
  if (!is_mobile) pageIndex.innerHTML = '1 / 3'
  else pageIndex.innerHTML = '1 / 2'
})

function changeIntro() {
  if (!loading) {
    stage++
    if (is_mobile && stage === 2) stage++
    switch (stage) {
      case 1:
        document.getElementById('startText').style.display = 'none'
        document.getElementById('explainText').style.display = 'block'
        setTimeout(() => {
          document.getElementById('explainText').classList.add('slide-in')
        }, 150)
        setTimeout(() => {
          $('#explainText').toggleClass("slide-in");
          setTimeout(() => {
            if (stage == 1) changeIntro()
          }, 350);
        }, timeToChante)
        if (!is_mobile) pageIndex.innerHTML = '2 / 3'
        else pageIndex.innerHTML = '2 / 2'
        break
      case 2:
        document.getElementById('explainText').style.display = 'none'
        document.getElementById('controlText').style.display = 'flex'
        setTimeout(() => {
          document.querySelectorAll('.controlText').forEach(elm => {
            elm.classList.add('slide-in')
          })
        }, 150)
        setTimeout(() => {
          $('.controlText').toggleClass("slide-in");
          setTimeout(() => {
            if (stage == 2) changeIntro()
          }, 150);
        }, timeToChante)
        pageIndex.innerHTML = '3 / 3'
        break
      case 3:
        document.querySelector('#main').setAttribute("style", "filter:blur(0); transform:scale(1, 1)")
        document.getElementById('intro').style.opacity = '0'
        setTimeout(() => document.getElementById('intro').style.display = 'none', 1000);

        document.querySelectorAll('.menu-top-control ul li:first-child a *').forEach((elm) => {
          elm.style.color = 'var(--black-color)';
        })
        document.querySelector('.icon-color img').style.opacity = '1'
        document.querySelector('.icon-save img').style.opacity = '1'
        introDone = true

        if (!is_mobile) {
          expandMenu()
        } else {
          expandMobile()
        }
    }
  }
}