const inputTxt = document.getElementById('input_txt')

$(inputTxt).change(function () {
  word = this.value;
});

// SLIDERS
const sliderSize = document.getElementById('slider_size')

$(sliderSize).change(function () {
  $(this).prev().html(`size / ${this.value}`);
  textSize(int(this.value));
});

const sliderY = document.getElementById('slider_y')
let yVal = 270;

$(sliderY).change(function () {
  $(this).prev().html(`y / ${this.value}`);
  yVal = this.value;
});
const sliderCopyLines = document.getElementById('slider_copyLines')
let copyLines = 48;

$(sliderCopyLines).change(function () {
  copyLines = int(this.value);
});