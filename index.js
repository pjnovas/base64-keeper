var fs = require('fs');
var path = require('path');
var http = require('http');
var moment = require('moment');

var config = require('./config.json');

var PORT = parseInt(process.env.PORT, 10) || 5000;
var dir = process.env.DIR || config.dir;

function log(msg, data){
  console.log(msg);
  if (data){
    console.dir(data);
  }
}

var server = http.createServer(function(req, res){

  var method = req.method.toLowerCase();

  switch(method){

    case 'post':

      var body;
      req.on('data', function(chunk) {
        body = chunk.toString();
      });

      req.on('end', function() {
        try {
          body = JSON.parse(body);
        } catch (e) {
          log('error on parsing request body', e);
          res.statusCode = 403;
          res.end('Forbidden');
        }

        if (body.secret !== config.secret){
          log('Request body secret disallowed!', { secret_received: body.secret });
          res.statusCode = 403;
          res.end('Forbidden');
          return;
        }

        saveFile(body.base64, body.extension || "png", function(err){
          if (err) { log("error on store image", err); }
          res.end();
        });
      });

      break;

    case 'get':
      res.end();
      break;
  }

});

function saveFile(base64, ext, done){
  var filename = moment().format("YYYYMMDD_HHmmss_x") + "." + ext; //be sure all files are named differently and get sorted

  var abs = path.join(dir, filename);
  fs.writeFile(abs, base64, 'base64', done);
}

server.listen(PORT, function(){
  log("Server listening on: http://localhost:" + PORT);
});
