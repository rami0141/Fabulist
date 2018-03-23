// =============================================================
// Dependencies
// =============================================================
var path = require("path");

// =============================================================
// Routes
// =============================================================
module.exports = function(app) {

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });


// remove or edit when drawing functionality is added
  app.get('/images', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/imageupload.html'));
  });

};
