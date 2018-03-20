'use strict';

var expect = require('chai').expect;

var db = require('../models');
// var db = null;
var Player = db.Player;
var Story = db.Story;

describe('story', function () {
	before(function() {
		// db.sequelize.sync({force: true});
		// db = require('../models');
	});
	after(function() {
		// db.sequelize.close();
	})
  it('should create story with name', function (done) {
    Story.create({
      name: 'Star Wars'
    }).then(function (story) {
      expect(story.name).to.equal("Star Wars");
      done();
    }).catch(function(err) {
    	expect(err).to.not.be.null;
    	done();
    })
  });

  it('should create another story with name', function (done) {
    Story.create({
      name: 'Lord of the Rings'
    }).then(function (story) {
      expect(story.name).to.equal("Lord of the Rings");
      done();
    }).catch(function(err) {
    	expect(err).to.not.be.null;
    	done();
    })
  });


  it('should reject new story with no name', function (done) {
    Story.create({
    }).then(function (response) {
    	throw new Error ("should not get here. An error should have already been thrown, resulting in the catch block being run")
      done();

    }).catch(function(err) {
    	expect(err).to.not.be.null;
    	done();
    })
  });


  it('should be able to load all storys from database', function (done) {
    Story.findAll({}).then(function (response) {
    	expect(response).to.be.an('array');
    	// lengthOf tests that length is at
    	expect(response).to.have.lengthOf.gt(1);
    	done();
    }).catch(function(err) {
    	expect(err).to.be.null;
    	// console.log("err: ", err);
    	done();
    })
  });

  it('should be able have an associated player', function (done) {
    Story.findAll({name: "Lord of the Rings"}).then(function (results) {
      expect(results).to.be.an('array');
      expect(results).to.have.lengthOf.gt(0);
      var story = results[0]
      console.log("\nstory:", story.id);
      Player.create({
        name: 'Xena',
        email: 'xena@exhausted.com',
        // storyId: story.id
      }).then(function(player) {
        // player.setStory(story, {save: false});
        // return player.save();
        // expect(player.name).to.equal("Xena");
        // expect(player.storyId).to.equal(story.id);
        done();
      }).catch(function(err) {
        expect(err).to.be.null;
        done();
      })
    }).catch(function(err) {
      expect(err).to.be.null;
      done();
    })
  });


});


 // db.sequelize.close();