

$(document).ready(function() {
  // --------------------------GAME NAME - NUMBER OF PLAYERS SECTION --------------------
  $(".paragraph").hide();
  $(".player-container").hide();



  // created a variable to store the number of players
  var totalPlayers = 0;
  var Story_ID = "";

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
  var emailInput = $("#player-email");
  var playerList = $("tbody");
  var playerContainer = $(".player-container");
      
  $("#startNow").hide();
 
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
  }

  // A function for creating a player. 
  // Only allowed to create number of players selected
  function upsertPlayer(playerData) {
    // console.log('playerData is:')
    // console.log(playerData);
    if( numberOfTurns < totalPlayers-1){
      var name = $("#player-name").val().trim();
      console.log(name);

      //Should update database??
      $.post("/api/players", playerData)
          .done(function(data) {
              console.log(data);
              Story_ID = data.id;

              // console.log("Story_ID is: "+Story_ID);
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

      // This will create an item in the list
      $("ol").append("<li>" + name + "</li>");
       // reset input box to nothing
      $("#team").hide();
      $("#player-name").hide();
      $("#startNow").fadeIn();
    }
  };

// ------------------------ RANDOM THEME SECTION-------------------------------

  $(document).on("click", "#startNow", randomThemes);
    $(".paragraph").fadeIn();

    function randomThemes() {
      $("#rule").hide();
      $("#storiesMenu").hide();
      var themes = ["Coco the Dog", "Nala the Cat", "Pepperoni Pizza", "Sunny Day", "Back To School", "Jumanji", "Red Lamborghini", "Barcelona", "Coffee Date", "Redwood Forest", "On A Cruise"];
      var randomThemes = themes[Math.floor(Math.random() * themes.length)];
      var html = "<h2>Story Theme: " + randomThemes + "</h2>";
      document.querySelector("#random").innerHTML = html;
    }



// --------------------- WRITE YOUR STORY SECTION ------------------------------
  













// ---------------------------- SHOW ALL POSTS ---------------------------------

  // blogContainer holds all of our posts
//   var storyContainer = $(".story-container");
//   var postCategorySelect = $("#category");

//   // Variable to hold our posts
//   var posts;

//     // The code below handles the case where we want to get blog posts for a specific author
//   // Looks for a query param in the url for author_id
//   var url = window.location.search;
//   var playerId;
//   if (url.indexOf("?player_id=") !== -1) {
//     playerId = url.split("=")[1];
//     getPosts(playerId);
//   }
//   // If there's no authorId we just get all posts as usual
//   else {
//     getPosts();
//   }

//   // This function grabs posts from the database and updates the view
//    function getPosts(player) {
//     playerId = player || "";
//     if (playerId) {
//       playerId = "/?player_id=" + playerId;
//     }
//     $.get("/api/turns" + playerId, function(data) {
//       console.log("Posts", data);
//       posts = data;
//       if (!posts || !posts.length) {
//         displayEmpty(player);
//       }
//       else {
//         initializeRows();
//       }
//     });
//   }


});




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
 

  