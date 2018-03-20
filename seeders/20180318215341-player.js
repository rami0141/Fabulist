'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Players', [{
        name: "Xena",
        email: "warriorprincess@gmail.com"
      }, {
        name: "Joe",
        email: "joe@exhausted.com",
      }, {
        name: "Cristina",
        email: "cristina@exhausted.com"
      }, {
        name: "Craig",
        email: "craig@exhausted.com"
      }, {
        name: "Jerridd",
        email: "jerrid@exhausted.com"
      }, {
        name: "Maiyer",
        email: "maiyer@exhausted.com"
      }
    ])

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
