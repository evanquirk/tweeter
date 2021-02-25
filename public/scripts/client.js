// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const handleTweetSubmit = function() {

  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log("Button clicked, performing AJAX call...");
    // const text = $("#tweet-text").val();
    $.ajax("/tweets", {
      method: "POST",
      data: $("#tweet-text").serialize(),
      dataType: "text"

    })
      .then(function () {
        // 1. reset counter, 2. empty form, 3. empty tweet container >> reload tweets
        console.log('Success!')
      })
  });
  
}

function loadTweets () {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
}

// loops through tweets (below)
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  tweets.forEach(function(element) {
    const $tweet = createTweetElement(element);
    $("#tweet-container").prepend($tweet);
  });
  
}

const createTweetElement = function(tweet) {
  const $tweet = $(`
  <article>
  <header>
  <span class="left">
  <img src="${tweet.user.avatars}" alt="avatar">
  <span>${tweet.user.name}</span>
  </span>
  <span class="user-handle">${tweet.user.handle}</span>
  </header>
  <div class="tweet-body">
  <p>${tweet.content.text}</p>
  </div>
  <footer>
  <span>${tweet.created_at}</span>
  <span class="icons">
  <i class="fa fa-flag" aria-hidden="true"></i> &nbsp;
  <i class="fa fa-retweet" aria-hidden="true"></i> &nbsp;
  <i class="fa fa-heart" aria-hidden="true"></i> &nbsp;
  </span>
  </footer>
  </article>
`);

return $tweet;
}


$(document).ready(function () {
  loadTweets();
  handleTweetSubmit();
})
