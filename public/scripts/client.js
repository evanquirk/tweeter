//-------- Form Submit For Tweet Creation -----------------------------------------------------
//Capture form submit to store form info using AJAX POST request, and reset form for next tweet. 

const formEventHandler = function (event) {
  // prevent page reload:
  event.preventDefault();

  // length of textarea input:
  const text = $("#tweet-text").val();

  // validate tweet isn't blank or too long (truthy/falsey condition):
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

      // reset textarea height so resize does not persist:
      $("#tweet-text").height(58)

      loadTweets();
    })
  } else {
    console.log("client error")
  }
}

const submitTweet = function () {
  $("form").on("submit", function (event) {
    formEventHandler(event);
  })
  $("form").on("keypress",function(event) {
    if(event.keyCode === 13 && !event.shiftKey) {
      formEventHandler(event);
    }
  });
}

//-------- Tweet Validation --------------------------------------------------------------
//Ensure that user text input for tweet is greater that 0 characters, but no more than 140.

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

//-------- Error Message ------------------------------------------------------------------
//If Tweet Validation fails, display the appropriate error message on screen for 1.5 seconds.

function errorMessage(message) {
  $(".error").text(message);
  $(".error").slideDown(function () {
    setTimeout(function () {
      $(".error").slideUp()
    }, 1500)
  })
}

//-------- Load Tweets -----------------------------------------------------------------------
//Load all tweets from the database, and pass the tweet objects to renderTweets for formatting.

function loadTweets() {
  $.get("/tweets", function (data) {
    renderTweets(data);
  }).fail(function (error) {
    console.log(error);
  });
}

//-------- Render Tweets ------------------------------------------------------------
//Pass through all tweets in database to be formatted using our create tweet function.

const renderTweets = function (tweets) {
  tweets.forEach(function (element) {
    const $tweet = createTweetElement(element);
    $("#tweet-container").prepend($tweet);
  });
}

const composeNewSlider = function () {
  $('.new-tweet').hide();
  $('#right-nav').click(function () {
    $('.new-tweet').slideToggle(400, function () {
      $('#tweet-text').focus();
    });
  });
};

//-------- Create New Tweet ----------------------------------------------------------------------
//Using User Submitted Input, this generates a formulated Tweet to be added to our tweet container.

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

//-------- Document Ready ---------------------------------
//Ensure that the DOM is ready before calling any functions.

$(document).ready(function () {
  loadTweets();
  charCounter();
  submitTweet();
  composeNewSlider();
})
