(function () {
  console.log('bookmarklet starting');
  let paragraphs = document.getElementsByTagName('a');
  //let headers = document.getElementsByTagName('h1');
  let divs = document.getElementsByTagName('div');

  // for (let i = 0; i < headers.length; i++) {
  //   // headers[i].innerHTML = "murama";
  // }

  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].innerHTML = "murama";
    paragraphs[i].style['color'] = '#7B06F7';
  }

  for (let i = 0; i < divs.length; i++) {
    divs[i].style['opacity'] = '0.8';
  }
})();