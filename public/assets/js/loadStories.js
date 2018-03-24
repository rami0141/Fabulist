$(document).ready(function() {
  console.log("hey")
  // function loadStories(storyID) {

  //   $.ajax({
  //     method: "GET",
  //     url: "/api/stories/"
  //   }).done(function(stories) {
  //     console.log(stories);
  //   })
  // };
  function getStories(category) {
    console.log("running getStories");
    var categoriyString = category || "";
    $.get("/api/stories", function(stories) {
      console.log(stories);

      var storiesContainer = $("#story .col-md-4").first();

      storiesContainer.empty();
      // $("#stories").empty();

      // for (var i = 0; i < stories.length; i++) {
        // console.log(stories)
      stories.forEach(function(story) {

        // console.log(i);
        // var story = stories[i];
        var newStoryDiv = $("<div>").addClass("card").attr("id", "story_card" + story.id)
          .append($("<img>").addClass("card-img-top")
            .attr("src", "http://via.placeholder.com/350x150")
          )
          .append($("<div>").addClass("card-body")
            .append($("<p>").addClass("card-text").text(story.name)
          )
        )
          console.log("turns: ", story.Turns)
        // for (var j = 0; j < story.Turns; j++) {
        //   var turn = story.Turns[j];
        //   console.log("turn", turn)
        //   var turnBody = $("<p>").text(turn.body)
        //   newStoryDiv.append(turnBody);
        // }
        story.Turns.forEach(function(turn) {
          console.log(turn.body)
          var turnBody = $("<p>").text(turn.body)
          newStoryDiv.find(".card-body").append(turnBody);

        })
      storiesContainer.append(newStoryDiv);
      })

    });
  }
  getStories();
})