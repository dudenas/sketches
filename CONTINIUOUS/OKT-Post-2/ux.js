const inputTxt = document.getElementById('input_txt')

$(inputTxt).change(function () {
  word = this.value;
});

// SLIDERS
const sliderSize = document.getElementById('slider_size')
let txtSize = 120

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

  yCopyLine = copyLines * 2;

  const tempSliderY = $(sliderY)[0]
  const tempSliderYMax = tempSliderY.max
  const tempSliderYValue = tempSliderY.value
  tempSliderY.min = int(-txtSize / 2);
  tempSliderY.max = int(txtSize / 2);
  yLines = (tempSliderYValue * tempSliderY.max) / tempSliderYMax;
  tempSliderY.value = yLines;
});


let yMaster = 0;

// COPY LINES
let yCopyLine = 25; // define so they would be one next to each other
// Y
const sliderY = document.getElementById('slider_y')
let yLines = 0;
$(sliderY).change(function () {
  $(this).prev().html(`copy y / ${this.value}`);
  yLines = int(this.value);
});


// height
const sliderCopyLines = document.getElementById('slider_copyLines')
let copyLines = 12;

$(sliderCopyLines).change(function () {
  copyLines = int(this.value);
  yCopyLine = copyLines * 2;
});

// TOP
const sliderCopyTop = document.getElementById('slider_copyTop')
$(sliderCopyTop).change(function () {
  $(this).prev().html(`copy top / ${this.value / 100}`);
  topPadding = float(int(this.value) / 100)
});

// gap
const sliderCopyGap = document.getElementById('slider_copyGap')
let gap = 1;
$(sliderCopyGap).change(function () {
  $(this).prev().html(`copy gap / ${this.value / 100}`);
  gap = float(int(this.value) / 100)
});

// times
const sliderCopyTimes = document.getElementById('slider_copyTimes')
let times = 40;
$(sliderCopyTimes).change(function () {
  $(this).prev().html(`copy times / ${this.value}`);
  times = int(this.value)
});

// TOGGLE
document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      clrs[0] = 255
      clrs[1] = 0
    } else {
      clrs[0] = 0
      clrs[1] = 255
    }
  });
});