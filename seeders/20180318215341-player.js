'use strict';


var db = require('../models');
// var db = null;
var Player = db.Player;
var Story = db.Story;
var Turn = db.Turn;

var runOnComplete = function() {
  db.sequelize.close();
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
    db.sequelize.close();
  });
}

var seedStories = function(callback) {
  Story.bulkCreate([
  	{ name: "Gangsters and Robots"},
  	{ name: "Swindlers Of The North"},
  	{ name: "Cats and Assassins"}
  ]).then(function(stories) {
    if (typeof callback === "function" ) {
      callback(stories);
    }
    else {
      runOnComplete();
    }
  })
};

// }

// var seedTurns = function(callback) {
// ("In a galaxy far, far away.", null, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
// ("In a hole in the ground there lived a hobbit.", null, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
// ("And they lived happily ever after.", null, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
// ("Terror made me cruel", null, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
// ("Some men get the world, some men get ex-hookers and a trip to Arizona.", null, 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
// ("The only people for me are the mad ones.", null, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
// ("It was a bright cold day in April, and the clocks were striking thirteen.", null, 3, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
// ("We were the people who were not in the papers. ", null, 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
// ("It sounds plausible enough tonight, but wait until tomorrow.", null, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);




// }

db.sequelize.sync({force: false}).then(function() {

  seedPlayers();
  seedStories();
  // Player.bulkCreate([
  //   { name: "Pete", email: "Pete@exhausted.com" },
  //   { name: "Andy", email: "Andy@exhausted.com" },
  //   { name: "Allison", email: "Allison@exhausted.com" },
  //   { name: "Betty", email: "Betty@exhausted.com" },
  //   { name: "Ruth", email: "Ruth@exhausted.com" },
  //   { name: "Xena", email: "warriorprincess@gmail.com" },
  //   { name: "Joe", email: "joe@exhausted.com" }

  // ]).then(function(results) {
  //   // show results, but just dataValues of the each object
  //   console.log("Insertion results: " , results.map(result => result.dataValues));
  //   db.sequelize.close();
  // });

});


  // Player.findAll({}).then(results => {
  //   console.log(results.map(result=> result.dataValues));
  //   db.sequelize.close();
  // })




// Player.bulkCreate([
//   { name: "Xena", email: "warriorprincess@gmail.com" },
//   { name: "Joe", email: "joe@exhausted.com" },
// 	{ name: "Pete", email: "Pete@exhausted.com" },
// 	{ name: "Andy", email: "Andy@exhausted.com" },
// 	{ name: "Allison", email: "Allison@exhausted.com" },
// 	{ name: "Betty", email: "Betty@exhausted.com" },
// 	{ name: "Ruth", email: "Ruth@exhausted.com" }

// ]).then(function(results) {
//   // show results, but just dataValues of the each object
//   console.log("Insertion results: " , results.map(result => result.dataValues));
//   db.sequelize.close();
// });

// Player.findAll({}).then(results => {
//   console.log(results.map(result=> result.dataValues));
//   db.sequelize.close();
// })

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     /*
//       Add altering commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkInsert('Person', [{
//         name: 'John Doe',
//         isBetaMember: false
//       }], {});
//     */
//     return queryInterface.bulkInsert('Players', [{
//         name: "Xena",
//         email: "warriorprincess@gmail.com"
//       }, {
//         name: "Joe",
//         email: "joe@exhausted.com",
//       }, {
//         name: "Cristina",
//         email: "cristina@exhausted.com"
//       }, {
//         name: "Craig",
//         email: "craig@exhausted.com"
//       }, {
//         name: "Jerridd",
//         email: "jerrid@exhausted.com"
//       }, {
//         name: "Maiyer",
//         email: "maiyer@exhausted.com"
//       }
//     ])

//   },

//   down: (queryInterface, Sequelize) => {
//     /*
//       Add reverting commands here.
//       Return a promise to correctly handle asynchronicity.

//       Example:
//       return queryInterface.bulkDelete('Person', null, {});
//     */
//   }
// };
