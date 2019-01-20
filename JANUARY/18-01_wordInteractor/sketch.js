let textField;
let output;
let submit;

function setup() {
  noCanvas();
  textField = select("#blueberry");
  output = select("#output");
  submit = select("#submit");
  submit.mousePressed(newText);
}

function newText() {
  let s = textField.value();
  let words = s.split(/(\W+)/);
  words.forEach((w,i) => {
    let span = createSpan(w);
    span.parent(output);
    if (!/\W+/.test(words[i])) {
      span.mouseOver(highlight);
    }
  });
}

function highlight(){
  this.html('rainbow');
  this.style('background-color', color(85,0,255, random(255)));
}