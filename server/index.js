const express = require('express');
const keys = require('../config.js')
// const needle = require("needle");
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '/client/dist')));

// const BearerToken = keys.bearer_token;
// const endpointUrl = "https://api.twitter.com/search/tweets";
// let count = 0;

// const getTweets = async (text) => {
//   const params = {
//     query: text.toString(),
//     lang: "en",
//     count: 100,
//   }
//   const response = await needle('get', endpointUrl, params, {
//     headers: {
//       "User-Agent": "v2RecentSearchJS",
//       "authorization": `Bearer ${BearerToken}`
//     }
//   })
//   console.log(response)
//   if (response.statusCode !== 200) {
//     if (response.statusCode === 403) {
//       res.status(403).send(response.body);
//     }
//     else {
//       throw new Error(response.body.error.message);
//     }
//   }
//   if (response.body) {
//     console.log('response body')
//     return response.body;

//   }
//   else
//     throw new Error("Unsuccessful Request");
// }

// //This returns the object to client
// const getTweetAnalysis = async (req, res) => {
//   try {
//     let twitterData = await getTweets(req.params.query);
//     //res.send(twitterData);
//     res.send('got it')
//     // res.send(await getSentimentScore(twitterData, count));
//   } catch (error) {
//     res.send(error);
//   }

// }

// //Simple Analysis
// async function getSentimentScore(text, count) {
//   var sentiment = new Sentiment();
//   var result = sentiment.analyze(text);
//   return result.score / count;
// }

// //API route
// app.get("/api/tweet/:query", getTweetAnalysis);

const Twitter = require('twitter-lite');
var Sentiment = require('sentiment');

const user = new Twitter({
  bearer_token: keys.bearer_token
  // consumer_key: keys.consumer_key,
  // consumer_secret: keys.consumer_secret,
});

// async function searchForTweets(query) {
//   try {
//     // let response = await user.getBearerToken();
//     // const app = new Twitter({
//     //   bearer_token: response.access_token,
//     // });

//     let response = await user.get(`/search/tweets`, {
//       q: query,
//       lang: "en",
//       count: 100,
//     });

//     let allTweets = "";
//     let count = 0;
//     for (tweet of response.statuses) {
//       count++;
//       allTweets += tweet.text + "\n";
//     }

//     const sentimentScore = await getSentimentScore(allTweets, count);

//     console.log(`The sentiment about ${query} is: ${sentimentScore}`);
//     res.send(sentimentScore)

//   } catch (e) {
//     console.log("There was an error calling the Twitter API");
//     console.dir(e);
//   }
// }

async function searchForTweets(req, res) {
  try {
    // let response = await user.getBearerToken();
    // const app = new Twitter({
    //   bearer_token: response.access_token,
    // });

    let response = await user.get(`/search/tweets`, {
      q: req.params.query,
      lang: "en",
      count: 100,
    });

    let allTweets = "";
    let count = 0;
    for (tweet of response.statuses) {
      count++;
      allTweets += tweet.text + "\n";
    }

    const sentimentScore = await getSentimentScore(allTweets, count);

    console.log(`The sentiment about ${req.params.query} is: ${sentimentScore}`);
    res.send(sentimentScore.toString())

  } catch (e) {
    console.log("There was an error calling the Twitter API");
    console.dir(e);
  }
}
async function getSentimentScore(text, count) {
  var sentiment = new Sentiment();
  var result = sentiment.analyze(text);

  return result.score / count;
}

app.get("/api/tweet/:query", searchForTweets);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);