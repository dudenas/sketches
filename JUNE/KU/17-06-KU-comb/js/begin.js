let stage = 0;

let nextButton = document.querySelector("#nextButton")
let pageIndex = document.querySelector("#page-index")

// INTRO
nextButton.addEventListener('click', () => {
  stage++
  switch (stage) {
    case 1:
      document.getElementById('startText').style.display = 'none'
      document.getElementById('explainText').style.display = 'block'
      pageIndex.innerHTML = '2 / 3'
      break
    case 2:
      document.getElementById('explainText').style.display = 'none'
      document.getElementById('controlText').style.display = 'flex'
      pageIndex.innerHTML = '3 / 3'
      break
    case 3:
      document.querySelector('#main').setAttribute("style", "filter:blur(0); transform:scale(1, 1)")
      document.getElementById('intro').style.display = 'none'
      document.querySelectorAll('.menu-top-control ul li:first-child a').forEach((elm) => {
        elm.style.color = 'var(--black-color)';
      })
      document.querySelector('.icon-color img').style.opacity = '1'
      document.querySelector('.icon-save img').style.opacity = '1'
  }
})