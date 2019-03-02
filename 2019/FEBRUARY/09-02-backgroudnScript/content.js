console.log("Chrome extension go 1.0");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, sendResponse) {
  if (msg.txt === "hello") {
    let paragraphs = document.getElementsByTagName('p');
    for (elm of paragraphs) {
      elm.style['background-color'] = "#7B06F7";
    }
  }
}