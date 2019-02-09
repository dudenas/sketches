console.log('background running');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  let msg = {
    txt: 'hello'
  }
  console.log("click");
  chrome.tabs.sendMessage(tab.id, msg);
}