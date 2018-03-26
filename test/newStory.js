var Nightmare = require("nightmare");

var path = require("path");
var fs = require("fs");

var fs = require('fs');
var imageSnapshotPath = path.join(__dirname , 'testOutputImages') ;

if (!fs.existsSync(imageSnapshotPath)){
    fs.mkdirSync(imageSnapshotPath);
}

var nightmare = Nightmare({ show: true });

// notes: I noticed that when selecting two players, night mare is able to submit more players. It would be nice to prevent that?

nightmare
  .goto("http://localhost:8080/")
  .wait()
  .click("#playBtn")
  .type("#inlineFormInputName", "My Awesome Story")
  .wait(1000)
  // .mousedown('.Select-value.State-NSW')
  .mousedown('#numberOfPlayers')
  .evaluate(function() {
    // return $("#numberOfPlayers").value("2")
    return document.querySelector('#numberOfPlayers').value = '3'

  })
  .wait(1000)
  .click("#startSubmit")
  .wait(".player-container")
  .type("#player-name", "Xena")
  .click("#team")
  .wait()
  .type("#player-name", "Gabrielle")
  .click("#team")
  .wait()
  .type("#player-name", "Callisto")
  .click("#team").wait(10)
  .wait(2000)
  // .wait(function() {return true })
  .click("#startNow")
  .wait(1000)
  // .wait(function() {return true})
  .screenshot(path.join(imageSnapshotPath, "./xena1.png"))

  .evaluate(function() {
    return document.querySelector("#random h2").innerHTML;
  })
  // .end()
  .then(function(result) {
    console.log(result);

  })
  .catch(function(error) {
    console.error("New game failed:", error);
  });


