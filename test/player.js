'use strict';

var expect = require('chai').expect;

var db = require('../models');
// var db = null;
var Player = db.Player;

describe('player', function () {
  before(function(done) {
    db.sequelize.sync({force: false}).then(function() {done()});
  });
  after(function() {
  })
  it('should create player with name and email', function (done) {
    Player.create({
      name: 'Xena',
      email: 'xena@exhausted.com',
      StoryId: 1
    }).then(function (player) {
      expect(player.name).to.equal("Xena");
      expect(player.email).to.equal("xena@exhausted.com");
      done();
    }).catch(function(err) {
      expect(err).to.not.be.null;
      done();
    })
  });

  it('should create another player with name and email', function (done) {
    Player.create({
      name: 'Joe',
      email: 'joe@exhausted.com',
      StoryId: 1
    }).then(function (player) {
      expect(player.name).to.equal("Joe");
      expect(player.email).to.equal("joe@exhausted.com");
      done();
    }).catch(function(err) {
     expect(err).to.not.be.null;
     done();
    })
  });


  it('should allow new player with null email', function (done) {
    Player.create({
      name: 'XenaWithNoEmail',
      StoryId: 1
    }).then(function (player) {
      expect(player.name).to.equal("XenaWithNoEmail");
      // note: database objects have email listed as null when not defined, but mocha/chai testing seems to say it is undefined.
      expect(player.email).to.be.undefined;
     // throw new Error ("should not get here. An error should have already been thrown, resulting in the catch block being run")
      done();

    }).catch(function(err) {
     expect(err).to.be.null;
     done();
    })
  });


  it('should reject new player with no name', function (done) {
    Player.create({
      email: 'player_with_no_name@exhausted.com',
      StoryId: 1
    }).then(function (response) {
     throw new Error ("should not get here. An error should have already been thrown, resulting in the catch block being run")
      done();
    }).catch(function(err) {
     expect(err).to.not.be.null;
     done();
    })
  });


  it('should be able to load all players from database', function (done) {
    Player.findAll({}).then(function (players) {
      expect(players).to.be.an('array');
      // due to previous inserts, there should be more than 1 element in resulting array.
      expect(players).to.have.lengthOf.gt(1);
      // uncomment the following line if you would like to see the results of the findAll query
      // console.log(players.map(player=> player.dataValues));
      done();
    }).catch(function(err) {
      expect(err).to.be.null;
      // console.log("err: ", err);
      done();
    })
  });
});
