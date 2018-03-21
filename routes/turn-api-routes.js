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

  // From express-fileupload example -- needed in modified form?
  // app.get('/', function(req, res) {
  //   res.sendFile(path.join(__dirname, '/views', 'index.html'));
  // });

   // POST route for uploading image file to AWS S3
   // if this fails, might need to move the client create code from 
   // server.js to here.
  app.post('api/turns/upload', function(req, res) {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    var sampleFile = req.files.sampleFile;
    
    var newFileName = Date.now() + req.files.sampleFile.name; // creating unique file name based on current time and file name of file uploaded, that way if two people upload the same file name it won't cause problems
    
    // Use the mv() method to place the file somewhere on your server 
    sampleFile.mv('uploads/' + newFileName, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      // Upload to S3
      var params = {
        localFile: 'uploads/' + newFileName,
  
        s3Params: {
          Bucket: process.env.S3BUCKET,
          Key: newFileName, // File path of location on S3
        },
      };
      var uploader = client.uploadFile(params);
      uploader.on('error', function(err) {
        console.error("unable to upload:", err.stack);
        res.status(500).send(err.stack);
      });
      uploader.on('end', function() {
        console.log("done uploading");
        res.send('File uploaded!');
        fs.unlink('uploads/' + newFileName); //Removing file from server after uploaded to S3
      });
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
