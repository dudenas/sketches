console.log('bot has started');

var Twit = require('twit');
var config = require('./config');

// setup twitter
var T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
})

// get the info from twitter
// let params = {
//   q: 'lithuania since:2019-01-01',
//   count: 10
// };

// function gotData(err, data, response) {
//   let tweets = data.statuses;
//   tweets.forEach(i => {
//     console.log(i.text);
//   })
// };

// T.get('search/tweets', params, gotData);

// post the tweet
function tweetIt(txt, id) {
  let tweet = {
    in_reply_to_status_id: id,
    status: txt
  };

  function tweeted(err, data, response) {
    err ? console.error(err) : console.log(data.text);
  }

  T.post('statuses/update', tweet, tweeted);
}

let searchFor = {
  track: '@MuramartG',
};

let stream = T.stream('statuses/filter', searchFor)

stream.on('tweet', gotTweet);

function gotTweet(eventMsg) {
  let name = eventMsg.user.screen_name;
  let id = eventMsg.id_str;
  tweetIt(`@${name} thank you for communicating`, id);
}