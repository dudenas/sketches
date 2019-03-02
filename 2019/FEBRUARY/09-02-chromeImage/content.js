console.log("Chrome extension go 1.0");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, sendResponse) {
  if (msg.txt === "hello") {
    let fileNames = [
      "img/output1.png",
      "img/output2.png",
      "img/output3.png",
      "img/output4.png",
      "img/output5.png",
      "img/output6.png",
      "img/output7.png"
    ];
    let imgs = document.getElementsByTagName('img');
    for (elm of imgs) {
      let r = Math.floor(Math.random() * fileNames.length);
      let file = fileNames[r];
      let url = chrome.extension.getURL(file);
      elm.src = url;

    }
    console.log('changed');
  }
}