

$(document).ready(function() {
  $("#hideThis").hide();
  $(".player-container").hide();
  // created a variable to store the number of players
  var totalPlayers = 0;
  var Story_ID = "";
  // an array to hold the players for this game
  var playerArr = [];

  $("#startSubmit").on("click", function(event) {
    event.preventDefault();

    $(".player-container").fadeIn();
    $(".hello").hide();

    var newGame = {
      name: $("#inlineFormInputName").val().trim()
    };
    // number of players
    totalPlayers = $("#numberOfPlayers").val().trim();
    console.log(totalPlayers);

    //posting newGame to the database
    $.post("/api/stories", newGame)
      .done(function(data) {
        console.log(data);
        Story_ID = data.id;
        // console.log("Story_ID is: "+Story_ID);
    });
    $("#game-name").val("");
  });

  console.log(totalPlayers);
  var numberOfTurns = 0;
  var nameInput = $("#player-name");
  var playerContainer = $(".player-container");

  $("#startNow").hide();

  //when you click button player-form, the handlePlayerFormSubmit will run
  $(document).on("submit", "#player-form", handlePlayerFormSubmit);

  // A function to handle what happens when the form is submitted to create a new Author
  function handlePlayerFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim()) {
      return;
    }

    // console.log("StoryID before upsert is: "+Story_ID);
    upsertPlayer({
      name: $("#player-name")
        .val()
        .trim(),
      email: "email@email.com",
      StoryId: Story_ID
    });
    console.log('player array');
    console.log(playerArr);
  }

  // A function for creating a player.
  // Only allowed to create number of players selected
  function upsertPlayer(playerData) {
    // console.log('playerData is:')
    // console.log(playerData);

    if ( numberOfTurns < totalPlayers-1){
      var name = $("#player-name").val().trim();
      console.log(name);

      $.post("/api/players", playerData)
      .done(function(playerData) {
        console.log('data is:');
        console.log(playerData);
        playerArr.push(
          {
            name: name,
            player_ID: playerData.id
          }
        );
      });

      // Add to number of turns
      numberOfTurns++
      // reset input box to nothing
      $("#player-name").val("");
      // This will create an item in the list
      $("ol").append("<li>" + name + "</li>");

    } else if (numberOfTurns = totalPlayers -1) {
      var name = $("#player-name").val().trim();
      console.log(name);

      //Database - should update last players name?
      $.post("/api/players", playerData)
        .done(function(playerData) {
          console.log('data is:');
          console.log(playerData);
          playerArr.push(
            {
              name: name,
              player_ID: playerData.id
            });
        });

      // This will create an item in the list
      $("ol").append("<li>" + name + "</li>");
       // reset input box to nothing
      $("#team").hide();
      $("#player-name").hide();
      $("#startNow").fadeIn();
    }

  };

  // --------------RANDOM THEME -------------------------------
    $(document).on("click", "#startNow", randomThemes);


  //random word function
  // Random Themes
  function randomThemes() {
    $("#hideThis").fadeIn();
    $("#rule").hide();
    var themes = ["Coco the Dog", "Nala the Cat", "Pepperoni Pizza", "Sunny Day", "Back To School", "Jumanji", "Red Lamborghini", "Barcelona", "Coffee Date", "Redwood Forest", "On A Cruise", "Coding Bootcamp", "Dwayne Johnson", "Korean Bbq"];
    var randomThemes = themes[Math.floor(Math.random() * themes.length)];
    $("#random").append("<h2> Story Theme: " + randomThemes + "</h2>");
    console.log(randomThemes);
    //This will display the first player in the array in html
    $(".current-player").html("<h4>" + playerArr[0].name + "</h4>");
  }


// ------------------ GAME ---------------------------------
//current player and playerID
//playerArr


  $(document).on("click", "#post", playerTurn);
    var bodyInput = $("#bodyInput");
    var sequence=0;
    var pturns = 0;
    var i = 0;
    var pj = 0;
    //for database update use pname and pid
    var pname;
    var pid;
    var playerNextName

  function playerTurn() {
    // each player is given 3 turns
    if (pturns == 2 && i == playerArr.length-1) {
      pname = playerArr[i].name;
      pid = playerArr[i].player_ID;
      console.log(pname);
      console.log(pid);
      postStory();
      $("#hideAfterLastTurn").hide();
      $("#rule").fadeIn();
    }
    else if (pturns < 3 && i < playerArr.length - 1) {
      //stored players in array in a variable
      playerNextName = playerArr[i+1].name;
      pname = playerArr[i].name;
      pid = playerArr[i].player_ID;
      console.log(pname);
      console.log(pid);
      // order
      sequence++
      //This will display the players in the array in html
      $(".current-player").html("<h4>" + playerNextName + "</h4>");

      //console.log(playerNextName);
      i++;
      //Need to post
      postStory();

    }
    // moves the turns
    // if all players all looped through, pturns increases
    else if (pturns < 3) {
    sequence++
    $(".current-player").html("<h4>" + playerArr[0].name + "</h4>");
    pname = playerArr[i].name;
    pid = playerArr[i].player_ID;
    postStory();
    console.log(pname);
    console.log(pid);
    //console.log(sequence);
    i = 0;
    //adds a turn
    pturns++;
  }
}


// -------------- posting stories -------

  function postStory() {
    event.preventDefault();

    // This will grab what is in the input box
    if(!bodyInput.val().trim()) {
      return;
    }
    // console.log(bodyInput);
    var player = playerArr[(i-1) % totalPlayers];
    var newStoryPost = {
      body: bodyInput.val().trim(),
      PlayerId: pid,
      StoryId: Story_ID,
      sequence: sequence
    }
    console.log(newStoryPost);
    // $("#bodyInput").val("");
    // $(".showParagraphHere").append("<p>" + newStoryPost.body + "</p>");


    console.log("post data being submitted",newStoryPost);
    $("#bodyInput").val("");
    $(".showParagraphHere").append("<p>" + newStoryPost.body + "</p>");
    // will post data to the turns table
    $.post("/api/turns", newStoryPost).done(function(data) {
      console.log("received response from turn post:", data)
    })
  };
});  // End of document.ready function






// ____________________________MODAL___________________________
 // Get the modal
 var modal = document.getElementById('myModal');

 // Get the button that opens the modal
 var btn = document.getElementById("playBtn");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal
 btn.onclick = function () {
     modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
     modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function (event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
    }
  $('#startNow').click(function(event) {
    modal.style.display = "none";

})

//_________Finished button when game is finished to refresh page______________
$( "#finished" ).click(function() {
    location.reload();
});
