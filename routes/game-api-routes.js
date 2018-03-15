var db = require("../models");

module.exports = function(app) {
  app.get("/api/games", function(req, res) {
    // Including Player and Turn in a left outer join
    db.Game.findAll({
      include: [db.Player, db.Turn]
    }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  app.get("/api/games/:id", function(req, res) {
    // Including Player and Turn in a left outer join
    db.Game.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Player, db.Turn]
    }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  app.post("/api/games", function(req, res) {
    db.Game.create(req.body).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  app.delete("/api/games/:id", function(req, res) {
    db.Game.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

};
