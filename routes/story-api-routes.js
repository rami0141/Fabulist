var db = require("../models");
const defaultOrdering = "ASC";


module.exports = function(app) {
  app.get("/api/stories", function(req, res) {
    // console.log("req.query", req.query)
    var storiesOrdering = req.query && req.query.ordering && req.query.ordering.toUpperCase();
    // verify that storiesOrdering is either "ASC" or "DESC", otherwise, reset to default ordering
    storiesOrdering = storiesOrdering === "ASC" || storiesOrdering === "DESC" ? storiesOrdering : defaultOrdering;
    db.Story.findAll({
      include: [db.Turn, db.Player],
      order: [["updatedAt", storiesOrdering]]
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
