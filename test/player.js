'use strict';

var expect = require('chai').expect;

var db = require('../models');
// var db = null;
var Player = db.Player;

var runTests = function() {
  describe('player', function () {
    before(function() {
      // db.sequelize.sync({force: true});
      // db = require('../models');
    });
    after(function() {
      // db.sequelize.close();
    })
    it('should create player with name and email', function (done) {
      Player.create({
        name: 'Xena',
        email: 'xena@exhausted.com'
      }).then(function (player) {
        expect(player.name).to.equal("Xena");
        expect(player.email).to.equal("xena@exhausted.com");
        done();
      }).catch(function(err) {
        expect(err).to.not.be.null;
        done();
      })
    });

    // it('should create another player with name and email', function (done) {
    //   Player.create({
    //     name: 'Joe',
    //     email: 'joe@exhausted.com'
    //   }).then(function (player) {
    //     expect(player.name).to.equal("Joe");
    //     expect(player.email).to.equal("joe@exhausted.com");
    //     done();
    //   }).catch(function(err) {
    //    expect(err).to.not.be.null;
    //    done();
    //   })
    // });


    // it('should allow new player null email', function (done) {
    //   Player.create({
    //     name: 'XenaWithNoEmail'
    //   }).then(function (player) {
    //     expect(player.name).to.equal("XenaWithNoEmail");
    //     expect(player.email).to.be.null;
    //    // throw new Error ("should not get here. An error should have already been thrown, resulting in the catch block being run")
    //     done();

    //   }).catch(function(err) {
    //    expect(err).to.be.null;
    //    done();
    //   })
    // });


    // it('should reject new player with no name', function (done) {
    //   Player.create({
    //     email: 'player_with_no_name@exhausted.com'
    //   }).then(function (response) {
    //    throw new Error ("should not get here. An error should have already been thrown, resulting in the catch block being run")
    //     done();
    //   }).catch(function(err) {
    //    expect(err).to.not.be.null;
    //    done();
    //   })
    // });


    // it('should be able to load all players from database', function (done) {
    //   Player.findAll({}).then(function (response) {
    //     expect(response).to.be.an('array');
    //     // lengthOf tests that length is at
    //     // expect(response).to.have.lengthOf.gt(1);
    //     done();
    //   }).catch(function(err) {
    //     expect(err).to.be.null;
    //     // console.log("err: ", err);
    //     done();
    //   })
    // });
  });

}

db.sequelize.sync({force: true}).then(function() {
  console.log("synced db models");
  runTests();
})

runTests();

 // db.sequelize.close();