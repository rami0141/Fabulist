var db = require("../models");

module.exports = function(app) {
  app.get("/api/stories", function(req, res) {
    db.Story.findAll({
      include: [db.Turn, db.Player]
    }).then(function(stories) {
      res.json(stories)
    });
  });

  app.get("/api/stories/:id", function(req, res) {
    db.Story.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Turn, db.Player]
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  app.post("/api/stories", function(req, res) {
    db.Story.create(req.body).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  app.delete("/api/stories/:id", function(req, res) {
    db.Story.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

};
