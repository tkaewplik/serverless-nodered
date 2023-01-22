const serverless = require("serverless-http");
const express = require("express");
const app = express();
const path = require('path');

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

// just for test uploading
app.use('/test', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
