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
  
  