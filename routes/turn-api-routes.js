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
    if (req.query.game_id) {
      query.GameId = req.query.game_id;
    }
    // Including Game in a left outer join (is there any need to get all turns for a player?)
    db.Turn.findAll({
      where: query,
      include: [db.Game]
    }).then(function(dbTurn) {
      res.json(dbTurn);
    });
  });

  // Get rotue for retrieving a single turn - probably not needed
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

  // POST route for saving a new turn
  app.post("/api/turns", function(req, res) {
    db.Turn.create(req.body).then(function(dbTurn) {
      res.json(dbTurn);
    });
  });

  // DELETE route for deleting turns - probably not needed
  app.delete("/api/turns/:id", function(req, res) {
    db.Turn.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTurn) {
      res.json(dbTurn);
    });
  });

  // PUT route for updating posts - probably not needed
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
