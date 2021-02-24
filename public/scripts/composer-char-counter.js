$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let charactersLimit = 140 - this.value.length;
    let counter = $(this).parent().find(".counter");
    counter.text(charactersLimit);
    if (charactersLimit < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "inherit");
    }
  })
});