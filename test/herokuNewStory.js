
var path = require("path");
var fs = require("fs");

var fs = require('fs');
var imageSnapshotPath = path.join(__dirname , 'testOutputImages') ;

var players = ["Xena", "Gabrielle", "Callisto"]
var storyTurns = [
	"Jonathon - who preferred Jon - and Elspeth - who preferred Ellie - were married in church on a fine day in June.",
  "Out in the pews, each of the guests was holding a vegetable.",
	"Some of them were also holding mangos.",
	"The reason for this was that Jon and Ellie loved vegetables.",
  "This is in fact how they met; at a Vegetables Lovers conference in San Diego.",
	"They also had delicious hummus.",
	"Ellie and Jon loved vegetables so much that the wedding invitations had asked the guests to bring vegetables instead of presents.",
	"After the ceremony, the happy couple invited all of the guest out to the church yard where en mass, the lucky vegetables were set free.",
  "And they were never heard from again..."
]

if (!fs.existsSync(imageSnapshotPath)){
    fs.mkdirSync(imageSnapshotPath);
}


var modalIsVisible = function () {
  return $('#myModal').is(':visible',function () {
    return true;
  })
};

var startSubmitClicked = function() {
  // return $("#startSubmit").on('click', function() {
  return $(".player-container").is(':visible', function() {
    return true;
  })
};
var teamClicked = function() {
  return $("#team").on('click', function() {
    return true;
  })
};

var startNowClicked = function() {
  return $("#hideThis").is(':visible', function() {
    return true;
  })
};

var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true, typeInterval: 10});



// async function doTheThing() {
//   await $('li:contains(Xena)');
//   return true; // if the selector is never found it should throw, so you wouldn't get here
// }

// notes: I noticed that when selecting two players, night mare is able to submit more players. It would be nice to prevent that?

nightmare
  .goto("https://fabulist.herokuapp.com/")
  // .goto("http://localhost:8080/")
  .wait()
  // .click("#playBtn")
  // .wait(function() {console.log("hey")})
  .wait(modalIsVisible)
  .wait(1500)
  // .end()
  .type("#inlineFormInputName", "My Awesome Story")
  .wait(1000)
  // // .mousedown('.Select-value.State-NSW')
  // .mousedown('#numberOfPlayers')
  .evaluate(function() {
    return document.querySelector('#numberOfPlayers').value = '3'
  })
  .wait(startSubmitClicked)
  .wait(1000)
  // .end()
  // .wait(1000)
  // // .click("#startSubmit")
  // .wait(".player-container")
  .type("#player-name", players.shift())
  .wait(500)
  .click("#team")
  .wait(1000)
  .wait(".player-container")
  .type("#player-name", players.shift())
  .wait(500)
  .click("#team")
  .wait(1000)
  .wait(".player-container")
  .type("#player-name", players.shift())
  .wait(500)
  .click("#team")
  .wait(100)

  .wait(startNowClicked)
  .wait(2000)
  .type("#bodyInput", storyTurns.shift())
  .wait(500)
  .click("#post")
  .wait(400)
  // .typeInterval(10)
  .type("#bodyInput", storyTurns.shift())
  .wait(400)
  .click("#post")
  .wait(300)
  .type("#bodyInput", storyTurns.shift())
  .wait(200)
  .click("#post")
  .wait(100)
  .type("#bodyInput", storyTurns.shift())
  .wait(100)
  .click("#post")
  .wait(100)
  .type("#bodyInput", storyTurns.shift())
  .wait(100)
  .click("#post")
  .wait(100)
  .type("#bodyInput", storyTurns.shift())
  .wait(100)
  .click("#post")
  .wait(100)
  .type("#bodyInput", storyTurns.shift())
  .wait(100)
  .click("#post")
  .wait(100)
  .type("#bodyInput", storyTurns.shift())
  .wait(100)
  .click("#post")
  .wait(100)
  .type("#bodyInput", storyTurns.shift())
  .wait(1000)
  .click("#post")
  .wait(10000)



  // .wait(10000)
  .evaluate(function() {
    return true
  })
  // .end()

  .then(function(result) {
    console.log(result);

  })
  .catch(function(error) {
    console.error("New game failed:", error);
  });


