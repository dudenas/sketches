console.log("Chrome extension go 1.0");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, sendResponse) {}

var s = function (sketch) {
  sketch.setup = function () {
    document.body.style["userSelect"] = "none";
    //let h = document.body.clientHeight;
    let c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    c.position(0, 0);
    c.style('pointer-events', 'none');
    sketch.clear();
  }

  sketch.draw = function () {
    sketch.noFill();
    sketch.stroke(5);
    sketch.strokeWeight(2);
    if (sketch.mouseIsPressed) {
      sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
    }
  }
}

var myP5 = new p5(s);