const express = require('express');
const keys = require('../config.js')
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '/client/dist')));

const Twitter = require('twitter-lite');
var Sentiment = require('sentiment');

const user = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
});

searchForTweets("lionel messi");

async function searchForTweets(query) {
  try {
    let response = await user.getBearerToken();
    const app = new Twitter({
      bearer_token: response.access_token,
    });

    response = await app.get(`/search/tweets`, {
      q: query,
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

    console.log(`The sentiment about ${query} is: ${sentimentScore}`);
    return sentimentScore;

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

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);