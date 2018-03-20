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

var stringify = require('json-stringify');

var runOnComplete = function() {
  db.sequelize.close();
}

var storyToString = function(story) {
  return  story.dataValues.name + ":\n" + story.dataValues.Turns.map(turn=> turn.body).join("\n") ;
}

// }
// body, illustration, StoryId, PlayerId, createdAt, updatedAt
var seedTurns = function(callback) {
  Turn.bulkCreate([
    { body: "In a galaxy far, far away.", sequence: 1, StoryId: 1, PlayerId: 1 },
    { body: "In a hole in the ground there lived a hobbit.", sequence: 2, StoryId: 1, PlayerId: 2 },
    { body: "And they lived happily ever after.", sequence: 3, StoryId: 1, PlayerId: 3 },
    { body: "Terror made me cruel", sequence: 1, StoryId: 2, PlayerId: 1 },
    { body: "Some men get the world, some men get ex-hookers and a trip to Arizona.", sequence: 1, StoryId: 2, PlayerId: 3 },
    { body: "The only people for me are the mad ones.", sequence: 2, StoryId: 2, PlayerId: 4 },
    { body: "It was a bright cold day in April, and the clocks were striking thirteen.", sequence: 1, StoryId: 3, PlayerId: 4 },
    { body: "We were the people who were not in the papers. ", sequence: 1, StoryId: 3, PlayerId: 2 },
    { body: "It sounds plausible enough tonight, but wait until tomorrow.", sequence: 1, StoryId: 3, PlayerId: 1 },
    { body: "Harry was not like every other boy. Harry was a wizard.", sequence: 1, StoryId: 4, PlayerId: 1},
    { body: "Then he did something that was both very brave and very stupid. Every book.", sequence :2, StoryId: 4, PlayerId: 2},
    { body: "Fortunately, he was friends with Hermione, who solved all his problems. And Snape Killed Dumbledore.", sequence: 3, StoryId: 4, PlayerId: 3},
    { body: "Eventually he killed the dark wizard Lord VoldyThing. And Snape loved Lily. The End.", sequence: 4, StoryId: 4, PlayerId: 1}
  ]).then(function(turns) {
    console.log(turns.map(turn=> turn.dataValues));
    Story.findAll({include: Turn}).then(function(stories) {
      console.log(stories.map(story => (storyToString(story))).join("\n\n"));
      runOnComplete();
    })
  });
}


var seedPlayers = function(callback) {
  Player.bulkCreate([
    { name: "Pete", email: "Pete@exhausted.com" },
    { name: "Andy", email: "Andy@exhausted.com" },
    { name: "Allison", email: "Allison@exhausted.com" },
    { name: "Betty", email: "Betty@exhausted.com" },
    { name: "Ruth", email: "Ruth@exhausted.com" },
    { name: "Xena", email: "warriorprincess@gmail.com" },
    { name: "Joe", email: "joe@exhausted.com" }

  ]).then(function(results) {
    // show results, but just dataValues of the each object
    console.log("Insertion results: ", results.map(result => result.dataValues));
    seedStories();
    // db.sequelize.close();
  });
}

var seedStories = function(callback) {
  Story.bulkCreate([
  	{ name: "Gangsters and Robots"},
  	{ name: "Swindlers Of The North"},
  	{ name: "Cats and Assassins"},
    { name: "Harry Potter -- The Very Abridged Edition"}
  ]).then(function(stories) {
    console.log(stories.map(story => story.dataValues));
    if (typeof callback === "function" ) {
      // callback(stories);
    }
    else {
      // runOnComplete();
      seedTurns()
    }
  })
};


db.sequelize.sync({force: true}).then(function() {
  // seedPlayers will call seedstories when done. seedStories will call seedTurns when done. seedTurns will return joined results when done.
  seedPlayers();
});
