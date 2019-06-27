var twitterShare = document.querySelector('[data-js="twitter-share"]');

twitterShare.onclick = function (e) {
  e.preventDefault();
  let msg = 'placeholder text, the card will show after you will post the image \n\n'
  var twitterWindow = window.open(`http://www.twitter.com/intent/tweet?url=http://dudenas.net&text=${escape(msg)}`, 'twitter-popup', 'height=350,width=600');
  if (twitterWindow.focus) {
    twitterWindow.focus();
  }
  return false;
}

var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function (e) {
  e.preventDefault();
  var facebookWindow = window.open(
    `https://www.facebook.com/sharer/sharer.php?u=https://dudenas.net`, 'facebook-popup', 'height=350,width=600');
  if (facebookWindow.focus) {
    facebookWindow.focus();
  }
  return false;
}