const rp = require('request-promise')
const download = require('image-downloader')
const cheerio = require('cheerio')
const fs = require('fs');
const URL = 'https://www.okt.lt/spektakliai/'

const OKT = []
const IMAGES = []
const months = [
  'sau',
  'vas',
  'kov',
  'bal',
  'geg',
  'bir',
  'lie',
  'rug',
  'rug',
  'spa',
  'lap',
  'gru'
]

const options = {
  url: URL
}

rp(options)
  .then((data) => {
    const regExp = /\<h2\>\<a href\=\"https\:\/\/www.okt.lt\/spektakliai\/([a-z-0-9%]+)/g
    let match = regExp.exec(data);
    let matches = []
    while (match != null) {
      matches.push(match[1])
      match = regExp.exec(data)
    }
    process.stdout.write('loading')
    getInfo(matches)
    // getImages(matches)
  })
  .catch((err) => {
    console.error(err)
  })

function getImages(plays) {
  console.log(`\ntotal ${plays.length} \n`)

  let i = 0

  function next() {
    if (i < plays.length) {
      process.stdout.write(`${URL + plays[i]} ${i + 1} / ${plays.length} \n`)

      const options = {
        url: URL + plays[i],
        transform: body => cheerio.load(body)
      }

      rp(options)
        .then(function ($) {
          const images = $('img')
          const temp = {
            title: plays[i],
            url: URL + plays[i],
            images: []
          }
          for (let k = 0; k < images.length; k++) {
            const imgURL = images[k].attribs.src
            if (imgURL != 'https://www.okt.lt/wp/wp-content/themes/okt-custom/img/remejai.png' &&
              imgURL != 'https://www.okt.lt/wp/wp-content/plugins/wp-polls/images/loading.gif' &&
              imgURL != 'https://www.okt.lt/wp/wp-content/themes/okt-custom/img/logo.png' &&
              imgURL != 'https://www.okt.lt/wp/wp-content/uploads/2018/12/750x100px_be-datu.jpg') {
              temp.images.push(imgURL)
            }
          }
          IMAGES.push(temp)
            ++i
          return next()
        }).catch((err) => {
          console.log(err)
        })
    } else {
      saveData(IMAGES);
    }
  }
  return next()
}

function getInfo(plays) {
  console.log(`\ntotal ${plays.length} \n`)

  let i = 0

  function next() {
    if (i < plays.length) {
      process.stdout.write(`${plays[i]} ${i + 1} / ${plays.length} \n`)
      const options = {
        url: URL + plays[i],
        transform: body => cheerio.load(body)
      }
      rp(options)
        .then(function ($) {
          const temp = {
            title: plays[i],
            url: URL + plays[i],
            images: []
          }

          // ABOUT 
          const play = $('.play')
          temp['Pavadinimas'] = play.find($('h1'))[0].children[0].data
          temp['Rezisierius'] = play.find($('.director'))[0].next.data
          temp['About'] = ''
          let txt = $('.content').find($('.text p'))
          for (let k = 0; k < txt.length; k++) {
            try {
              temp['About'] += txt.find($('span'))[k].children[0].data
              // console.log(txt.find($('span'))[k].children)
            } catch (err) {
              // console.log(err)
              temp['About'] += txt[k].children[0].data
            }
          }
          // console.log("TCL: next -> temp['About']", temp['About'])


          // IMAGES
          // const images = $('img')
          // for (let k = 0; k < images.length; k++) {
          //   const imgURL = images[k].attribs.src
          //   if (imgURL != 'https://www.okt.lt/wp/wp-content/themes/okt-custom/img/remejai.png' &&
          //     imgURL != 'https://www.okt.lt/wp/wp-content/plugins/wp-polls/images/loading.gif' &&
          //     imgURL != 'https://www.okt.lt/wp/wp-content/themes/okt-custom/img/logo.png' &&
          //     imgURL != 'https://www.okt.lt/wp/wp-content/uploads/2018/12/750x100px_be-datu.jpg') {
          //     temp.images.push(imgURL)
          //   }
          // }

          // INFO
          const title = $('.left', '.float-left').find($('h3'))
          const values = $('.left', '.float-left').find($('p'))
          for (let k = 0; k < title.length; k++) {
            const children = values[k].children
            let tempKey = title[k].children[0].data
            let tempValue = values[k].children[0].data
            if (children.length > 1) {
              tempValue = ""
              children.forEach((elm, index) => {
                if (elm.name == undefined) {
                  const regExp = /– (.*)/g
                  let match = regExp.exec(elm.data);
                  if (match != null) {
                    if (index < children.length - 1) {
                      tempValue += match[1] + ", "
                    } else {
                      tempValue += match[1]
                    }
                  } else {
                    const regExp = /[A-ZŽŠČ][a-ząčęėįšųūž]+ [A-ZŽŠČ][a-ząčęėįšųūž]+/g
                    let match = regExp.exec(elm.data);
                    if (match) {
                      if (index < children.length - 1) {
                        tempValue += match[0] + ", "
                      } else {
                        tempValue += match[0]
                      }
                    } else {
                      if (index == 0) {
                        tempKey = elm.data
                      } else {
                        tempValue += elm.data
                      }
                    }
                  }
                }
              })
            }

            if (tempValue === undefined) {
              tempValue = values.find($('span'))[0].children[0].data
            }
            const regExp = /, | ir/
            if (tempKey == 'Premjera') {
              const regExp = /([^ ]+) ([^ ]+) ? ([^ ]+)/g
              let match = regExp.exec(tempValue);
              let matchMonth = match[2].substring(0, 3)
              let changedMonth = 0
              months.forEach((elm, index) => {
                if (elm == matchMonth) changedMonth = index + 1
              })
              temp[tempKey] = `${match[1]} ${changedMonth} ${match[3]}`
            } else {
              temp[tempKey] = tempValue.split(regExp)
            }
            if (k == title.length - 1 && tempKey != 'Premjera') {
              const regExp = /([^ ]+) ([^ ]+) ? ([^ ]+)/g
              let tempValue = values[k + 1].children[0].data
              let match = regExp.exec(tempValue);
              let matchMonth = match[2].substring(0, 3)
              let changedMonth = 0
              months.forEach((elm, index) => {
                if (elm == matchMonth) changedMonth = index + 1
              })
              temp['Premjera'] = `${match[1]} ${changedMonth} ${match[3]}`
            }
          }
          ++i
          OKT.push(temp)
          return next()
        }).catch((err) => {
          console.log(err)
        })
    } else {
      saveData(OKT);
    }
  }
  return next()
}

function saveData(file) {
  file.sort(function (a, b) {
    return (new Date(b['Premjera']) - new Date(a['Premjera'])) * -1
  });

  fs.writeFile("test.json", JSON.stringify(file), (err) => {
    err ? console.error(err) : console.log('\nsaved JSON')
  });
  // fs.writeFile("test.js", file, (err) => {
  //   err ? console.error(err) : console.log('\nsaved JS')
  // });
}