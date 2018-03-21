'use strict';

/*
to run: 'npm run seed'

Or, from app root directory (without quotes):
'node ./db/seedWithSequelize.js'
*/

// Note: this will drop the existing database tables (sync({force: true})). Modify if you don't want that.



var db = require('../models');
// var db = null;
var Player = db.Player;
var Story = db.Story;
var Turn = db.Turn;

var runOnComplete = function() {
  db.sequelize.close();
}

var storyToString = function(story) {
  return  "Story.id: " + story.id + "\n" +
    "Story.name: " + story.dataValues.name + "\n" +
    "Players: " + story.dataValues.Players.map(player=> player.dataValues.name).join(", ") + "\n" +
    story.dataValues.Turns.map(turn=> (turn.body || turn.illustration) + " (" + createdPlayers.find(player=> player.id === turn.PlayerId).name +")").join("\n") ;
}

// the resulting stories and players will be assigned to these references for easy access.
var createdStories = null;
var createdPlayers = null;


var seedTurns = function(callback) {
  // the players created in seedPlayers() are stored in the global createdPlayers array for convenience. Similarly for stories.

  // creating the following variables is totally unnessary and just done to show which players and stories are assigned to each turn
  var [pete, andy, allison, betty, ruth, erika, xena, joe] = createdPlayers;
  var [gangsterStory, swindlerStory, catStory, wizardStory] = createdStories;
  var imageURL = "https://s3.us-east-2.amazonaws.com/fabulist-images/test-img.png";

  Turn.bulkCreate([
    { body: "In a galaxy far, far away.", sequence: 1, StoryId: gangsterStory.id, PlayerId: pete.id },
    { body: "In a hole in the ground there lived a hobbit.", sequence: 2, StoryId: gangsterStory.id, PlayerId: andy.id },
    { body: "Here is a caption.", illustration: imageURL, sequence: 3, StoryId: gangsterStory.id, PlayerId: andy.id },
    { body: "And they lived happily ever after.", sequence: 4, StoryId: gangsterStory.id, PlayerId: pete.id },


    { body: "Terror made me cruel", sequence: 1, StoryId: swindlerStory.id, PlayerId: allison.id },
    { body: "Here is a caption.", illustration: imageURL, sequence: 2, StoryId: swindlerStory.id, PlayerId:betty.id },
    { body: "Some men get the world, some men get ex-hookers and a trip to Arizona.", sequence: 3, StoryId: swindlerStory.id, PlayerId:allison.id },
    { body: "The only people for me are the mad ones.", sequence: 4, StoryId: swindlerStory.id, PlayerId: betty.id },

    { body: "It was a bright cold day in April, and the clocks were striking thirteen.", sequence: 1, StoryId: catStory.id, PlayerId: erika.id },
    { body: "Here is a caption.", illustration: imageURL, sequence: 2, StoryId: catStory.id, PlayerId: ruth.id },
    { body: "We were the people who were not in the papers.", sequence: 3, StoryId: catStory.id, PlayerId: ruth.id },
    { body: "It sounds plausible enough tonight, but wait until tomorrow.", sequence: 4, StoryId: catStory.id, PlayerId: erika.id },

    { body: "Harry was not like every other boy. Harry was a wizard.", sequence: 1, StoryId: wizardStory.id, PlayerId: xena.id},
    { body: "Then he did something that was both very brave and very stupid. Every book.", sequence :2, StoryId: wizardStory.id, PlayerId: joe.id},
    { body: "Here is a caption.", illustration: imageURL, sequence :3, StoryId: wizardStory.id, PlayerId: xena.id},
    { body: "Fortunately, he was friends with Hermione, who solved all his problems. And Snape Killed Dumbledore.", sequence: 4, StoryId: wizardStory.id, PlayerId: joe.id},
    { body: "Eventually he killed the dark wizard Lord VoldyThing. And Snape loved Lily. The End.", sequence: 5, StoryId: wizardStory.id, PlayerId: xena.id}
  ]).then(function(turns) {
    // uncomment following line to print all the created turns
    // console.log(turns.map(turn=> turn.dataValues));

    // this last bit loads all stories, including their turns, and displays.
    Story.findAll({include: [Turn, Player]}).then(function(stories) {
      console.log(stories.map(story => (storyToString(story))).join("\n-------------------------\n"));
      runOnComplete();
    })

    // Print story in reverse (seems to work. Uncomment to try out. Story orders are unspecified)
    // note you may need to uncomment out the "runOnComplete()" above, which closed the sequelize connection. potentially prematurely.
    // Story.findAll({
    //   include: [Turn, Player],
    //   order: [['id', 'DESC'],[Turn, 'sequence', 'DESC']]
    // }).then(function(stories) {
    //   console.log("\n\nPrinting stories in reverse order, starting from last story.\n\n")
    //   console.log(stories.map(story => (storyToString(story))).join("\n-------------------------\n"));
    //   runOnComplete();
    // })

  });
}


var seedPlayers = function(callback) {
  Player.bulkCreate([
    { name: "Pete", email: "Pete@exhausted.com", StoryId: createdStories[0].id },
    { name: "Andy", email: "Andy@exhausted.com" , StoryId: createdStories[0].id },
    { name: "Allison", email: "Allison@exhausted.com" , StoryId: createdStories[1].id },
    { name: "Betty", email: "Betty@exhausted.com" , StoryId: createdStories[1].id  },
    { name: "Ruth", email: "Ruth@exhausted.com" , StoryId: createdStories[2].id  },
    { name: "Erika", email: "erika@exhausted.com" , StoryId: createdStories[2].id  },
    { name: "Xena", email: "warriorprincess@gmail.com" , StoryId: createdStories[3].id  },
    { name: "Joe", email: "joe@exhausted.com", StoryId: createdStories[3].id }

  ]).then(function(players) {
    // show results, but just dataValues of the each object
    // console.log("Insertion results: ", players.map(player => player.dataValues));
    createdPlayers = players.map(player=> player.dataValues);
    seedTurns();
  });
}

var seedStories = function(callback) {
  Story.bulkCreate([
  	{ name: "Gangsters and Robots"},
  	{ name: "Swindlers Of The North"},
  	{ name: "Cats and Assassins"},
    { name: "Harry Potter -- The Very Abridged Edition"}
  ]).then(function(stories) {
    // console.log(stories.map(story => story));
    createdStories  = stories.map(story => story.dataValues);
    if (typeof callback === "function" ) {
      // callback(stories);
    }
    else {
      // runOnComplete();
      // seedTurns()
      seedPlayers();
    }
  })
};


db.sequelize.sync({force: true}).then(function() {
  // seedStories will call run, and then call seedPlayers when done.
  // seedPlayers will call seedTurns when done.
  // seedTurns will return joined results when done.
  seedStories();
});
