const http = require('http')
var fs = require('fs');
var socket = require('socket.io');

var server = http.createServer(function(req, res) {
   res.writeHead(200, { 'Content-type': 'text/html'});
   //res.end(str);
   res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8082, function() {
   console.log('Listening at: http://localhost:8082');
});

var socketio=socket.listen(server);//socketio
socketio.on('connection', function (socketclient) {
        console.log('connect socket:');    
    });

 function intervalFunc() {
   const options = {
      hostname: '10.222.31.197',
      port: 8000,
      path: '/v1_0/machine/allsession',
      method: 'GET'
    }
    
    str = ''
    callback = function(response) {
       
       response.on('data', function (chunk) {
         str += chunk;
       });
     
       response.on('end', function () {
         console.log(str);
         socketio.emit('apiDateTime', new Date().toJSON());
         socketio.emit('apichange', str);
       });
     }

     var req = http.request(options, callback);
     req.end();
 } 
 setInterval(intervalFunc, 15000);

