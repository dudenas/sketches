console.log('background running');

chrome.runtime.onMessage.addListener(receiver);

window.word = 'murama art';

function receiver(request, sender, sendResponse) {
  console.log(request);
  word = request.text;
}