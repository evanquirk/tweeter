
const formSubmitHandler = function () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    console.log("Button clicked, performing AJAX call...");
    const text = $("#tweet-text").val();
    if (tweetValidation(text)) {
      $.ajax("/tweets", {
        method: "POST",
        data: $("#tweet-text").serialize(),
        dataType: "text"
      })
      .then(function () {
        $(".counter").text(140);
        $("form").trigger("reset");
        $("#tweet-container").empty();
        loadTweets();
      })
    } else {
      console.log("client error")
    }
    });
  }
  

  function errorMessage(message) {
    $(".error").text(message);
    $(".error").slideDown(function () {
      setTimeout(function () {
        $(".error").slideUp()
      }, 1500)
    })
  }
  
  function tweetValidation(text) {
    if (!text) {
      errorMessage("You must add text to your tweet!");
      return false;
    } else if (text.length > 140) {
      errorMessage("Your tweet is too long!");
      return false;
    } else {
      return true;
    }
}

function loadTweets() {
  $.get("/tweets", function (data) {
    renderTweets(data);
  }).fail(function (error) {
    console.log(error);
  });
}


const renderTweets = function (tweets) {
  tweets.forEach(function (element) {
    const $tweet = createTweetElement(element);
    $("#tweet-container").prepend($tweet);
  });
  // loops through tweets (below)
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}


const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function (tweet) {
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
      <p>${escape(tweet.content.text)}</p>
    </div>

    <footer>
      <span>${moment(new Date(tweet.created_at)).fromNow()}</span>
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
  formSubmitHandler();
})
