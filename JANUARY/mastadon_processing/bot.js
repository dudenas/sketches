console.log('mastodon bot starting...');

require('dotenv').config();
const Mastodon = require('mastodon-api');
const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);


const M = new Mastodon({
  client_key: process.env.CLIENT_KEY,
  client_secret: process.env.CLIENT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  timeout_ms: 60 * 1000,
  api_url: 'https://botsin.space/api/v1/'
})

const cmd = 'processing-java --sketch=`pwd`/photoCut --run';

const stream = M.stream('streaming/user');
stream.on('message', response => {
  if (response.event === 'notification' && response.data.type === 'mention') {
    const acct = response.data.account.acct;
    const reply_id = response.data.status.id;
    const content = response.data.status.content;
    const regex = /\d+/;
    const stages = content.match(regex) ? content.match(regex)[0] : -1;
    tootIt(acct, reply_id, stages);
  }
});


// setInterval(() => tootIt(), 2000);

function tootIt(acct, reply_id, stages) {
  toot(acct, reply_id, stages)
    .then(response => {
      console.log(response);

    })
    .catch(error => console.error(error));
}

async function toot(acct, reply_id, stages) {
  if (stages == -1) {
    // Step 3 :
    const params = {
      status: `@${acct} por favor senjor, specify the cut number`,
      in_reply_to_id: reply_id
    };
    const response = await M.post('statuses', params);

    return {
      success: true,
      values: -1
    };
  } else {

    // Step 1
    const response1 = await exec(`${cmd} ${stages}`);
    const out = response1.stdout.split('\n');
    const values = out[0];
    const stream = fs.createReadStream('photoCut/img/output.png');

    // Step 2 : Upload Media
    const params1 = {
      file: stream,
      description: `art ° ${values}`
    };
    const response2 = await M.post('media', params1);
    const id = response2.data.id;

    // Step 3 :
    const params2 = {
      status: `@${acct} art ° ${values}`,
      in_reply_to_id: reply_id,
      media_ids: [id]
    };

    const response3 = await M.post('statuses', params2);

    return {
      success: true,
      values: values
    };
  }
}

// exec(cmd)
//   .then(response => {
//     const values = response.stdout;
//     console.log(values);
//     const stream = fs.createReadStream('photoCut/img/output.png');
//     const params = {
//       file: stream,
//       description: `art ° ${values}`
//     };
//     return M.post('media', params);
//   })
//   .then(response => {
//     console.log(response.data.id);
//     return M.post('statuses', params);
//   })
//   .catch(error => console.error(error));