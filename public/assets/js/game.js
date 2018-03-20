$(document).ready(function() {

  var totalPlayers = 0;

    $("#startSubmit").on("click", function(event) {
        event.preventDefault();

        var newGame = {
          name: $("#game-name").val().trim()
        };

        $.post("/api/stories", newGame)
            .done(function(data) {
              console.log(data);
        });

        var totalPlayers = {
          id: $("#numberOfPlayers").val().trim()
        };
        
        //Getting an error when trying to post number of players
        $.post("/api/players", totalPlayers)
            .done(function(data) {
              console.log(data);
        });

        $("#game-name").val("");
        $("#numberOfPlayers").val("");

    });

    // $("#storySubmit").on("click", function(event) {
    //   even.preventDefault();

    //   var newStory = {

    //   }

    // })
})

   




  
  