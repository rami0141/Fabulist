

$(document).ready(function() {
  $(".player-container").hide();

  var totalPlayers = 0;

  $("#startSubmit").on("click", function(event) {
    event.preventDefault();

    $(".player-container").fadeIn();
    $(".hello").hide();

    var newGame = {
      name: $("#inlineFormInputName").val().trim()
    };

    totalPlayers = $("#numberOfPlayers").val().trim();
      console.log(totalPlayers);

      $.post("/api/stories", newGame)
        .done(function(data) {
          console.log(data);
      });
        $("#game-name").val("");
    });

  // Getting references to the name inout and author container, as well as the table body
  var nameInput = $("#player-name");
  var emailInput = $("#player-email");
  var playerList = $("tbody");
  var playerContainer = $(".playerContainer");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#player-form", handlePlayerFormSubmit);
  // $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the intiial list of Authors
  getPlayers();

  // A function to handle what happens when the form is submitted to create a new Author
  function handlePlayerFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim()) {
      return;
    }

    upsertPlayer({
      name: $("#player-name")
        .val()
        .trim()
    });
  }

  // A function for creating a player. 
  function upsertPlayer(playerData) {
    $.post("/api/players", playerData)
      .then(getPlayers);
  }

  // Function for creating a new list row for players
  function createPlayerRow(playerData) {
    console.log(playerData);
    var newTr = $("<tr>");
    newTr.data("player", playerData);
    newTr.append("<td>" + playerData.name + "</td>");
    return newTr;
  }

  // Function for retrieving players and getting them ready to be rendered to the page
  function getPlayers() {
    $.get("/api/players", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createPlayerRow(data[i]));
      }
      renderPlayerList(rowsToAdd);
      nameInput.val("");
      emailInput.val("");
    });
  }

  // A function for rendering the list of players to the page
  function renderPlayerList(rows) {
    playerList.children().not(":last").remove();
    playerContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      playerList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no players
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must add a player before you can start your game.");
    playerContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  //might not need this
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("player");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/players/" + id
    })
    .then(getPlayers);
  };
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

  
