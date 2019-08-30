const inputTxt = document.getElementById('input_txt')

$(inputTxt).change(function () {
  word = this.value;
});

// SLIDERS
const sliderSize = document.getElementById('slider_size')
let txtSize = 48

$(sliderSize).change(function () {
  $(this).prev().html(`size / ${this.value}`);
  txtSize = int(this.value)
  textSize(txtSize);
  pg.textSize(txtSize);

  // update maximum line size
  const tempSlider = $(sliderCopyLines)[0]
  const tempMax = tempSlider.max
  const tempValue = tempSlider.value
  tempSlider.max = int(txtSize / 5 * 3);
  copyLines = (tempValue * tempSlider.max) / tempMax;
  tempSlider.value = copyLines;

  const tempSliderY = $(sliderY)[0]
  const tempSliderYMax = tempSliderY.max
  const tempSliderYValue = tempSliderY.value
  tempSliderY.min = int(-txtSize / 2);
  tempSliderY.max = int(txtSize / 2);
  yLines = (tempSliderYValue * tempSliderY.max) / tempSliderYMax;
  tempSliderY.value = yLines;
});


let yMaster = 0;

const sliderY = document.getElementById('slider_y')
let yLines = 0;

$(sliderY).change(function () {
  $(this).prev().html(`y / ${this.value}`);
  yLines = int(this.value);
});


const sliderCopyLines = document.getElementById('slider_copyLines')
let copyLines = 48;

$(sliderCopyLines).change(function () {
  copyLines = int(this.value);
});