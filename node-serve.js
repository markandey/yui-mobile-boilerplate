var express = require('express'),
    server  = express();

server.configure(function() {
    server.use(express.methodOverride());
    server.use(express.bodyParser());
    server.use(express.static(__dirname + '/public'));
    server.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    server.use(server.router);
});


// Handles requests to the root path ("/") by simply sending the "shell" page
// which creates the `Y.App` instance.
server.get('/', function (req, res) {
    res.sendfile('index.html');
});


// Handles all other requests by redirecting the browser back to the root path
// and tacking on URL's path as the fragment; e.g. "/foo/" => "/#/foo/".
server.get('*', function (req, res) {
    res.redirect('/#' + req.url);
});

server.listen(5000); 
console.log('Connect To 127.0.0.1:5000');