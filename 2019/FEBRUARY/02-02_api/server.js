let words = {
  "art": 5,
  "design": 12,
  "shit": -3,
  "masmerizing": 4
}

console.log('server is starting...');
let express = require('express');

let app = express();
let server = app.listen(3000, () => console.log('listening'));

app.use(express.static('public'));

app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
  let data = request.params;
  let word = data.word;
  let score = Number(data.score);
  let reply;
  if (!score) {
    reply = {
      msg: "Score is required"
    }
  } else {
    words[word] = score;
    reply = {
      msg: "Thank You for your word"
    }
  }
  response.send(reply);
}

app.get('/all', sendAll);

function sendAll(request, response) {
  response.send(words);
}

app.get('/search/:word/', searchWord);

function searchWord(request, response) {
  let word = request.params.word;
  let reply;
  if (words[word]) {
    reply = {
      status: 'found',
      word: word,
      score: words[word]
    }
  } else {
    reply = {
      status: 'notFound',
      word: word
    }
  }
  response.send(reply);
}