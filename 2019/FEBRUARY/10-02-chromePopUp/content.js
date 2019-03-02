console.log("Chrome extension go 1.0");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, sendResponse) {
  let paragraphs = document.getElementsByTagName('p');
  let ahref = document.getElementsByTagName('a');
  let span = document.getElementsByTagName('span');
  for (elm of paragraphs) {
    elm.innerHTML = msg.txt;
  }
  for (elm of span) {
    elm.innerHTML = msg.txt;
  }
}