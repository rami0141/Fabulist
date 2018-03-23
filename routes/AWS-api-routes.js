// This will need to be edited when drawing functionality is added

module.exports = function(app) {

  var path = require('path');
  var s3 = require('s3');
  var fs = require('fs');
  var AWS = require('aws-sdk');

  var awsS3Client = new AWS.S3({
    region: 'us-east-2',
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  
  var client = s3.createClient({
    maxAsyncS3: 20, // this is the default 
    s3RetryCount: 3, // this is the default 
    s3RetryDelay: 1000, // this is the default 
    multipartUploadThreshold: 20971520, // this is the default (20 MB) 
    multipartUploadSize: 15728640, // this is the default (15 MB) 
    s3Client: awsS3Client
  });

  app.post('/upload', function(req, res) {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    var inputFile = req.files.sampleFile;
    
    var newFileName = Date.now() + req.files.sampleFile.name; // creating unique file name based on current time and file name of file uploaded, that way if two people upload the same file name it won't cause problems
  
    var link = "https://s3.us-east-2.amazonaws.com/fabulist-images/" + newFileName;
    
    // Use the mv() method to place the file somewhere on your server 
    inputFile.mv('uploads/' + newFileName, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      // Upload to S3
      var params = {
        localFile: 'uploads/' + newFileName,
  
        s3Params: {
          Bucket: 'fabulist-images',
          Key: newFileName, // File path of location on S3
          ACL: 'public-read'
        },
      };
      console.log(params);
      var uploader = client.uploadFile(params);
      uploader.on('error', function(err) {
        console.error("unable to upload:", err.stack);
        res.status(500).send(err.stack);
      });
      uploader.on('end', function() {
        console.log("done uploading");
        res.send('File uploaded!  ' + link);
  
        fs.unlink('uploads/' + newFileName, function(err){
          if(err) return console.log(err);
          console.log('file deleted successfully');
        }); //Removing file from server after uploaded to S3
      });
    });
  });

}