'use strict';

/*
to run: from app root directory (without quotes):
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
  return  "Story.id: " + story.id + "\n" + story.dataValues.name + "\n" + story.dataValues.Turns.map(turn=> turn.body).join("\n") ;
}

var createdStories = null;
var createdPlayers = null;
// }
// body, illustration, StoryId, PlayerId, createdAt, updatedAt
var seedTurns = function(callback) {
  // console.log(createdStories)
  // console.log(createdPlayers);
  Turn.bulkCreate([
    { body: "In a galaxy far, far away.", sequence: 1, StoryId: createdStories[0].id, PlayerId: createdPlayers[0].id },
    { body: "In a hole in the ground there lived a hobbit.", sequence: 2, StoryId: createdStories[0].id, PlayerId: createdPlayers[1].id },
    { body: "And they lived happily ever after.", sequence: 3, StoryId: createdStories[0].id, PlayerId: createdPlayers[2].id },
    { body: "Terror made me cruel", sequence: 1, StoryId: createdStories[1].id, PlayerId: createdPlayers[0].id },
    { body: "Some men get the world, some men get ex-hookers and a trip to Arizona.", sequence: 1, StoryId: createdStories[1].id, PlayerId: createdPlayers[2].id },
    { body: "The only people for me are the mad ones.", sequence: 2, StoryId: createdStories[1].id, PlayerId: createdPlayers[3].id },
    { body: "It was a bright cold day in April, and the clocks were striking thirteen.", sequence: 1, StoryId: createdStories[2].id, PlayerId: createdPlayers[3].id },
    { body: "We were the people who were not in the papers. ", sequence: 1, StoryId: createdStories[2].id, PlayerId: createdPlayers[1].id },
    { body: "It sounds plausible enough tonight, but wait until tomorrow.", sequence: 1, StoryId: createdStories[2].id, PlayerId: createdPlayers[0].id },
    { body: "Harry was not like every other boy. Harry was a wizard.", sequence: 1, StoryId: createdStories[3].id, PlayerId: createdPlayers[0].id},
    { body: "Then he did something that was both very brave and very stupid. Every book.", sequence :2, StoryId: createdStories[3].id, PlayerId: createdPlayers[1].id},
    { body: "Fortunately, he was friends with Hermione, who solved all his problems. And Snape Killed Dumbledore.", sequence: 3, StoryId: createdStories[3].id, PlayerId: createdPlayers[2].id},
    { body: "Eventually he killed the dark wizard Lord VoldyThing. And Snape loved Lily. The End.", sequence: 4, StoryId: createdStories[3].id, PlayerId: createdPlayers[0].id}
  ]).then(function(turns) {
    // console.log(turns.map(turn=> turn.dataValues));
    Story.findAll({include: Turn}).then(function(stories) {
      console.log(stories.map(story => (storyToString(story))).join("\n\n"));
      runOnComplete();
    })
  });
}


var seedPlayers = function(callback) {
  Player.bulkCreate([
    { name: "Pete", email: "Pete@exhausted.com", StoryId: createdStories[0].id },
    { name: "Andy", email: "Andy@exhausted.com" , StoryId: createdStories[1].id },
    { name: "Allison", email: "Allison@exhausted.com" , StoryId: createdStories[2].id },
    { name: "Betty", email: "Betty@exhausted.com" , StoryId: createdStories[1].id  },
    { name: "Ruth", email: "Ruth@exhausted.com" , StoryId: createdStories[0].id  },
    { name: "Xena", email: "warriorprincess@gmail.com" , StoryId: createdStories[2].id  },
    { name: "Joe", email: "joe@exhausted.com", StoryId: createdStories[1].id }

  ]).then(function(players) {
    // show results, but just dataValues of the each object
    // console.log("Insertion results: ", players.map(player => player.dataValues));
    // seedStories();
    // db.sequelize.close();
    createdPlayers = players.map(player=> player.dataValues);
    // console.log("createdPlayers: ", createdPlayers)
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
    console.log(stories.map(story => story));
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
  // seedPlayers will call seedstories when done. seedStories will call seedTurns when done. seedTurns will return joined results when done.
  // seedPlayers();
  seedStories();
});
