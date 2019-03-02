console.log("Chrome extension go 0.1");

window.addEventListener('mouseup', wordSelected);

function wordSelected() {
  let selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    let msg = {
      text: selectedText
    }
    chrome.runtime.sendMessage(msg);
  }
}