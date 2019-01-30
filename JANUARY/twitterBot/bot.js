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
function tweetIt(txt, id, imgUrl) {
  // execute processing sketch
  let cmd = 'processing-java --sketch=`pwd`/photoCut --run';

  exec(`${cmd} ${imgUrl}`, processing);

  function processing() {
    let filePath = 'photoCut/img/output.png';
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
      var params = {
        status: `${txt} #muramart`,
        in_reply_to_status_id: id,
        media_ids: [mediaIdStr]
      }

      function tweeted(err, data, response) {
        err ? console.error(err) : console.log(data.text);
      }
      // Post tweet
      T.post('statuses/update', params, tweeted);
    }
  }
}

// get the stream search for a tweet with specific txt
let searchFor = {
  track: '@MuramartG',
};

let stream = T.stream('statuses/filter', searchFor)

stream.on('tweet', gotTweet);

function gotTweet(eventMsg) {
  // get the info of the event in json
  // console.log(eventMsg);
  // var fs = require('fs');
  // var json = JSON.stringify(eventMsg, null, 2);
  // fs.writeFile('tweet.json', json, (err, result) => {
  //   if (err) console.log('error', err);
  // });

  // use the actual event for getting name and msg id
  let from = eventMsg.user.screen_name;
  let id = eventMsg.id_str;
  let tweetTxt = eventMsg.text;
  let imgUrl = eventMsg.entities.media[0].media_url;
  tweetIt(`@${from} thank you for communicating`, id, imgUrl);
}