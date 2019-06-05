var $el = $("#show-canvas");
var elHeight = $el.outerHeight();
var elWidth = $el.outerWidth();
var $wrapper = $("#scaleable-wrapper");

$(window).resize(function () {
  starterData = {
    size: {
      width: $wrapper.width(),
      height: $wrapper.height()
    }
  }
  doResize(null, starterData)
});


function doResize(event, ui) {
  var scale;
  let h = ui.size.height
  let w = ui.size.width
  if (h > w) {
    // when window height is more than window width MOBILE
    scale = h / elHeight
  } else {
    if (w / elWidth > h / elHeight) {
      scale = w / elWidth
    } else {
      scale = h / elHeight
    }
  }

  $el.css({
    transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
  });

}

// initial data
var starterData = {
  size: {
    width: $wrapper.width(),
    height: $wrapper.height()
  }
}

doResize(null, starterData);