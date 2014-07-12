
var http = require('http'),
  util = require('util'),
  formidable = require('formidable'),
  server;

var local = require('vfs-local')({
  root: __dirname + "/dummy/"
});
var uploader=require('../../restful')("/upload/", local);
server = http.createServer(function(req, res) {
  if (req.url == '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="/upload/" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
  } else if (req.url == '/upload/') {
    console.log('upload')
      uploader(req,res);
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('404');
  }
});
server.listen(8080);

console.log('listening on http://localhost:8080/');