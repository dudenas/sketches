let fs = require('fs');
let data = fs.readFileSync('additional.json');
let afinndata = fs.readFileSync('afinn111.json');
let additional = JSON.parse(data);
let afinn = JSON.parse(afinndata);

//console.log(additional);
console.log('server is starting...');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let server = app.listen(3000, () => console.log('listening'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.post('/analyze', analyzeThis);

function analyzeThis(request, response) {
  let txt = request.body.text;
  let words = txt.split(/\W+/);
  let totalScore = 0;
  let wordlist = [];

  words.forEach((elm) => {
    let word = elm.toLowerCase();
    let score = 0;
    let found = false;
    if (additional.hasOwnProperty(word)) {
      score = Number(additional[word]);
      found = true;
    } else if (afinn.hasOwnProperty(word)) {
      score = Number(afinn[word]);
      found = true;
    };
    totalScore += score;
    if (found) wordlist.push({
      word: word,
      score: score
    });
  })

  let comp = totalScore / words.length;

  let reply = {
    score: totalScore,
    comparative: comp,
    words: wordlist
  }
  response.send(reply);
}

// add word through get
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
    response.send(reply);
  } else {
    additional[word] = score;
    let data = JSON.stringify(additional, null, 2);
    fs.writeFile('additional.json', data, (err) => {
      // console.error(err);
      console.log(`a new word | ${word} | added to the list `);
      reply = {
        word: word,
        score: score,
        status: "Success"
      }
      response.send(reply);
    })
  }

}

app.get('/all', sendAll);

function sendAll(request, response) {
  let data = {
    additional: additional,
    aafinn: afinn
  }
  response.send(data);
}

app.get('/search/:word/', searchWord);

function searchWord(request, response) {
  let word = request.params.word;
  let reply;
  if (additional[word]) {
    reply = {
      status: 'found',
      word: word,
      score: additional[word]
    }
  } else {
    reply = {
      status: 'notFound',
      word: word
    }
  }
  response.send(reply);
}