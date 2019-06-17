var twitterShare = document.querySelector('[data-js="twitter-share"]');

twitterShare.onclick = function (e) {
  e.preventDefault();
  var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
  if (twitterWindow.focus) {
    twitterWindow.focus();
  }
  return false;
}

var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function (e) {
  e.preventDefault();
  var facebookWindow = window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${document.URL}
    &picture=https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg
    &quote=similique officia consectetur maxime placeat incidunt delectus corrupti repellendus repudiandae
    &description=this is a description`, 'facebook-popup', 'height=350,width=600');
  if (facebookWindow.focus) {
    facebookWindow.focus();
  }
  return false;
}