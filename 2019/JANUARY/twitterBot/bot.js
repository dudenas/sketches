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

// post it
let count = 0;
function tweetIt(txt, id, imgUrl, social) {
  // execute processing sketch
  // let cmd = 'processing-java --sketch=`pwd`/photoCut --run';
  console.log("starting processing the image...");
  let cmd = 'PC/photoCut';
  exec(`${cmd} ${imgUrl} ${social} ${count}`, processing);
  console.log("finnished processing");

  function processing() {
    console.log("starts Writting");
    let filePath = `PC/img/output${count}.png`;
    let params = {
      encoding: 'base64'
    }
    let b64 = fs.readFileSync(filePath, params);

    // Upload the media
    T.post('media/upload', {
      media_data: b64
    }, uploaded);

    function uploaded(err, data, response) {
      //this is where the tweet goes
      // with the media attached
      var mediaIdStr = data.media_id_string;
      console.log(id);
      var params = {
        in_reply_to_status_id: id,
        status: `${txt} #muramart`,
        media_ids: [mediaIdStr]
      }

      function tweeted(err, data, response) {
        err ? console.error(err) : console.log(data.text);
      }
      // Post tweet
      count++;
      T.post('statuses/update', params, tweeted);
    }
  }
}

// get the stream search for a tweet with specific txt
let searchFor = {
  track: '@MuramartG give me art',
};

let stream = T.stream('statuses/filter', searchFor)

stream.on('tweet', gotTweet);

function gotTweet(eventMsg) {
  console.log("someone mentionted you");
  // use the actual event for getting name and msg id
  let from = eventMsg.user.screen_name;
  let id = eventMsg.id_str;
  let tweetTxt = eventMsg.text;
  let imgUrl = -1;
  if (eventMsg.entities.media != undefined) {
    imgUrl = eventMsg.entities.media[0].media_url;
  }
  let regex = /\b(fb|twitter)\b/
  let social = tweetTxt.match(regex);
  if (social != null) {
    if (social[0] == "fb") social = "fb";
    else if (social[0] == "twitter") social = "twitter";
  } else social = -1;
  tweetIt(`@${from} Love you @${from} for exploring `, id, imgUrl, social);
}