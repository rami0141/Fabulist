$(document).ready(function() {
  const allowImages = false;
  $("#fstories .col-md-4").empty();

  function createStoryTurnElement(turn) {
    var turnElement = $("<div>").addClass("story-turn card");
    if (allowImages && turn.illustration) {
      turnElement
        .append($("<img>").addClass("img-fluid").attr("src", turn.illustration))
        .append("<caption>").addClass("text-muted").text(turn.body)
    }
    else {
      turnElement.append($("<p>").text(turn.body))
    }
    return turnElement;
  }


  function createStoryBodyDiv(turns) {
    var storyTurnsContainer = $("<div>").addClass("story-body");
    turns.forEach(function(turn) {
      var turnElement = createStoryTurnElement(turn);
      storyTurnsContainer.append(turnElement);
    })
    return storyTurnsContainer;
  }

  function createStoryPlayersDiv(players) {
    var storyFooter = $("<div>").addClass("card-footer")
      .append($("<h5>").text("Authors/Players:"))
      .append($("<ul>").addClass("list-style").append(players.map(player=> $("<li>").addClass("text-muted").text(player.name))))
    return storyFooter;
  }


  function createStoryDiv(story) {
    var newStoryDiv = $("<div>").addClass("col-md-4")
    var newStoryCard = $("<div>").addClass("card story-card").attr("id", "story-card" + story.id)
      .append($("<div>").addClass("card-body")
        .append($("<h4>").addClass("card-text").text(story.name)
      )
    )
    var storyTurnsContainer = createStoryBodyDiv(story.Turns);
    var storyPlayers = createStoryPlayersDiv(story.Players);

    newStoryDiv.append(newStoryCard);
    newStoryCard.find(".card-body").append(storyTurnsContainer.hide());
    newStoryCard.append(storyPlayers.hide());
    return newStoryDiv;
  }

  function getStories(category) {
    // console.log("running getStories");
    var categoriyString = category || "";
    $.get("/api/stories?ordering=DESC", function(stories) {

      $("#fstories .col-md-4").empty();

      var storiesContainerRow = $("#fstories .col-md-4").first().parent();

      storiesContainerRow.empty();
      stories.forEach(function(story) {
        var newStoryDiv = createStoryDiv(story);
        storiesContainerRow.append(newStoryDiv);
      })

    });
  }
  getStories();
})

$(document).on("click", ".story-card", function(event){
  var x = $(this).find(".story-body, .card-footer");
  var isHidden = x.css("display") === "none"
  // console.log(x.css("display"));
  // console.log(isHidden)
  x.slideToggle();
});