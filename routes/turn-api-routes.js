// =============================================================
// Dependencies
// =============================================================
// Requiring our models
var db = require("../models");

// =============================================================
// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the turns
  app.get("/api/turns", function(req, res) {
    var query = {};
    if (req.query.story_id) {
      query.GameId = req.query.story_id;
    }
    // Including story in a left outer join
    db.Turn.findAll({
      where: query,
      include: [db.Story]
    }).then(function(dbTurn) {
      res.json(dbTurn);
    });
  });

 
  // POST route for saving a new turn
  app.post("/api/turns", function(req, res) {
    db.Turn.create(req.body).then(function(dbTurn) {
      res.json(dbTurn);
    });
  });
  

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // the routes below here are probably not needed
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  // Get route for retrieving a single turn
  app.get("/api/turns/:id", function(req, res) {
    // Including Game in a left outer join
    db.Turn.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Game]
    }).then(function(dbTurn) {
      res.json(dbTurn);
    });
  });

  // DELETE route for deleting turns
  app.delete("/api/turns/:id", function(req, res) {
    db.Turn.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTurn) {
      res.json(dbTurn);
    });
  });

  // PUT route for updating turns
  app.put("/api/turns", function(req, res) {
    db.Turn.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTurn) {
        res.json(dbTurn);
      });
  });
};
