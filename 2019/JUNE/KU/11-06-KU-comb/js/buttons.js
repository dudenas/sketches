//—————————————————————————————————————————————————————— DATE
// close date chosen
document.querySelector("#modal-date-btn").addEventListener('click', () => {
  modalDate.style.display = "none"
  mainGrfc.style.filter = "blur(0px)"
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