// =============================================================
// Dependencies
// =============================================================
// Requiring our models
var db = require("../models");

// =============================================================
// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the players for a story
  app.get("/api/players", function(req, res) {
    var query = {};
    if (req.query.story_id){
      query.storyId = req.query.story_id;
    }
    db.Player.findAll({
      where: query,
      include: [db.Story]
    }).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // POST route for saving a new Player
  app.post("/api/players", function(req, res) {
    // console.log('Posting new player');
    // console.log('req.body is:');
    // console.log(req.body);
    db.Player.create(req.body).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // Get route for retrieving a single Player
  app.get("/api/players/:id", function(req, res) {
    db.Player.findOne({
      where: {
        id: req.params.id
      },
    }).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// the routes below here are probably not needed
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // DELETE route for deleting players - probably not needed
  app.delete("/api/players/:id", function(req, res) {
    db.Player.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // PUT route for updating players - probably not needed
  app.put("/api/players", function(req, res) {
    db.Player.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPlayer) {
        res.json(dbPlayer);
      });
  });
};
