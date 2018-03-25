$(document).ready(function() {

  var imageOfXena = "https://scontent.ffcm1-2.fna.fbcdn.net/v/t1.0-9/68163_10152518951143602_406979144894524496_n.jpg?oh=61dafd800d5640cf47669f95593afdec&oe=5B3BE451"
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
      // console.log(stories);

      $("#fstories .col-md-4").empty();

      var storiesContainerRow = $("#fstories .col-md-4").first().parent();

      storiesContainerRow.empty();
      // var cardDeck = $("<div>").addClass("card-deck")
      // storiesContainerRow.append(cardDeck)

      // $("#stories").empty();

      // for (var i = 0; i < stories.length; i++) {
        // console.log(stories)
      stories.forEach(function(story) {

        // console.log(i);
        // var story = stories[i];
        var newStoryDiv = $("<div>").addClass("col-md-4")
        var newStoryCard = $("<div>").addClass("card showStory").attr("id", "story_card" + story.id)
          // .append($("<img>").addClass("card-img-top")
          //   .attr("src", "http://via.placeholder.com/350x150")
          // )
          .append($("<div>").addClass("card-body")


            .append($("<h4>").addClass("card-text").text(story.name)
          )
          // .append($("<h5>").text("Authors/Players:"))
          // .append($("<ul>").addClass("list-style").append(story.Players.map(player=> $("<p>").addClass("card-text").text(player.name))))

        )

        // console.log("turns: ", story.Turns)
        // for (var j = 0; j < story.Turns; j++) {
        //   var turn = story.Turns[j];
        //   console.log("turn", turn)
        //   var turnBody = $("<p>").text(turn.body)
        //   newStoryDiv.append(turnBody);
        // }
        var storyTurnsContainer = $("<div>").addClass("story-body").attr("id", "story-body-" + story.id).hide();
        story.Turns.forEach(function(turn) {
          var turnElement = $("<div>").addClass("story-turn card");
          // console.log(turn.body)

          if (turn.illustration) {
            turnElement
              .append($("<img>").addClass("img-fluid").attr("src", imageOfXena || turn.illustration))
              .append("<caption>").addClass("text-muted").text(turn.body)
          }
          else {
            turnElement.append($("<p>").text(turn.body))
          }
          // var turnBody = $("<p>").text(turn.body)
          // newStoryDiv.find(".card-body").append(turnBody);
          // newStoryDiv.find(".card-body").append(turnElement);
          storyTurnsContainer.append(turnElement);

        })
        var storyFooter = $("<div>").addClass("card-footer")
          .append($("<h5>").text("Authors/Players:"))
          .append($("<ul>").addClass("list-style").append(story.Players.map(player=> $("<li>").addClass("text-muted").text(player.name))))
        // newStoryDiv.find(".card-body").append(storyTurnsContainer);
        // newStoryDiv.find(".card").append(storyFooter)
        newStoryDiv.append(newStoryCard);
        newStoryCard.find(".card-body").append(storyTurnsContainer);
        newStoryCard.append(storyFooter  .hide());
        // cardDeck.append(newStoryCard);
        storiesContainerRow.append(newStoryDiv);

        // storiesContainerRow.find(".card-deck").append(newStoryDiv.append(newStoryCard));

      })

    });
  }
  getStories();
})
$(document).on("click", ".showStory", function(event){
  var x = $(this).find(".story-body, .card-footer");
  x.toggle();
console.log("hey", x);
});