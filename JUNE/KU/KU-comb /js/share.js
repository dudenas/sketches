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

// FB.init({
//   appId: 453034275429574,
//   status: true,
//   cookies: true,
//   xfbml: true
// })
facebookShare.onclick = function (e) {
  e.preventDefault();
  // FB.ui({
  //   method: 'share',
  //   name: 'This is the content of the "name" field.',
  //   link: 'https://www.imdb.com/title/tt9428444/?ref_=nv_sr_1?ref_=nv_sr_1',
  //   picture: 'https://m.media-amazon.com/images/M/MV5BMTc3MTkzYTgtZTYwMC00NjBiLWE0YzYtZjhkMjMyMDA5N2MyXkEyXkFqcGdeQXVyNjI2MzY3Mzg@._V1_UY268_CR149,0,182,268_AL_.jpg',
  //   caption: 'Top 3 reasons why you should care about your finance',
  //   description: "What happens when you don't take care of your finances? Just look at our country -- you spend irresponsibly, get in debt up to your eyeballs, and stress about how you're going to make ends meet. The difference is that you don't have a glut of taxpayers…",
  //   message: ""
  // });
  // FB.ui({
  //   method: 'share'
  // }, function (response) {});
  var facebookWindow = window.open(
    `https://www.facebook.com/sharer/sharer.php?u=https://www.ku.lt/en/
  &quote=similique officia consectetur maxime placeat incidunt delectus corrupti repellendus repudiandae
  &description=this is a description`, 'facebook-popup', 'height=350,width=600');
  if (facebookWindow.focus) {
    facebookWindow.focus();
  }
  return false;
}