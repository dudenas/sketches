console.log('bot has started');

var Twit = require('twit');
var config = require('./config');

var T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
})

T.post('statuses/update', {
  status: 'hello world!'
}, function (err, data, response) {
  console.log(data)
})