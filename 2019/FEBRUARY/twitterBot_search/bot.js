console.log('bot has started');

var Twit = require('twit');
var config = require('./config');

// Require child_process for triggering script for Processing
var exec = require('child_process').exec;

// For reading image files
var fs = require('fs');

// setup twitter
var T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
})

let getParams = {
  q: `asado since:2018-01-01`,
  count: 2000
}

let myData = {
  users: []
}

T.get('search/tweets', getParams, function (err, data, response) {
  var json = JSON.stringify(data, null, 2);
  data.statuses.forEach(elm => {
    let text = elm.text;
    let name = elm.user.screen_name;
    let location = elm.user.location;
    let media = elm.entities.media;
    media != undefined ? media = media[0].media_url : media = -1;
    let p = {
      name: name,
      location: location,
      text: text,
      media: media
    }
    myData.users.push(p);
  })
  var jsonMyData = JSON.stringify(myData, null, 2);
  fs.writeFile('tango.json', jsonMyData, (err, result) => {
    if (err) console.log('error', err);
    else {
      console.log('saved');
    }
  });
})

// get the stream search for a tweet with specific txt
let searchFor = {
  track: ['argentina', 'asado']
};

let stream = T.stream('statuses/filter', searchFor)

//stream.on('tweet', gotTweet);

function gotTweet(eventMsg) {
  // use the actual event for getting name and msg id
  // let from = eventMsg.user.screen_name;
  // let id = eventMsg.id_str;
  // let tweetTxt = eventMsg.text;
  // let imgUrl = -1;
  // if (eventMsg.entities.media != undefined) {
  //   imgUrl = eventMsg.entities.media[0].media_url;
  // }
  // let regex = /\b(fb|twitter)\b/
  // let social = tweetTxt.match(regex);
  // if (social != null) {
  //   if (social[0] == "fb") social = "fb";
  //   else if (social[0] == "twitter") social = "twitter";
  // } else social = -1;
  // tweetIt(`@${from} Love you @${from} for exploring `, id, imgUrl, social);
}