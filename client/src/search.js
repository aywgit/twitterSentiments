const fetch = require("node-fetch");
const token = "Bearer AAAAAAAAAAAAAAAAAAAAAPCtRQEAAAAATR4v%2FY0%2BJAFFo%2FwW5afGHzeCRFs%3DLRUKzD3HgpyEO9K1wbypOLM9MSODvuTEpWs5StwyVA4cHsAMgp"; // Replace BEARER_TOKEN with your token
const method = "GET";
const options = {
  method: method,
  headers: {
    "Content-type": "application/json",
    Authorization: token,
  },
};
const query = "lionel messi";
const a = fetch(
  `https://api.twitter.com/1.1/search/tweets.json?q=${query}`,
  options
)
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => {
    console.log(error);
  });

export default a