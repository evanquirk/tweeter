const charCounter = function () {
  $("#tweet-text").on("input", function() {
    // resize textarea dynamically:
    this.style.height = ""
    this.style.height = this.scrollHeight + "px";
  
    let charactersLimit = 140 - this.value.length;
    let counter = $(this).parent().find(".counter");
    counter.text(charactersLimit);
    if (charactersLimit < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "inherit");
    }
  })
}