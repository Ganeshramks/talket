http = require('http')
express = require('express')
url = require('url')
path = require('path')
webSocket = require('ws')

server = http.createServer()

app = express()

app.use(express.static(path.join(__dirname+'/')));

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname+'/talk.html'));
})

webSocketServer = webSocket.Server
wss = new webSocketServer({server:server});
clients = [];
wss.on('connection', function(websoc){
	request = websoc.upgradeReq;
	if (request.headers.origin != 'http://localhost:8000') {
		websoc.close();
	} else {
		clients.push(websoc);
		obj = {};
		obj.senderId = 'dhbjdbhwdhkxn';
		obj.message = "Hi Ya!"
		websoc.send(JSON.stringify(obj));
	}
	console.log(clients.length);
	
	websoc.on('message', function(message){
		console.log(message);
	});

	websoc.on('close', function(){
		console.log('webSocket connection closed');
	});

})


server.on('request', app);
server.listen(8000, function(){
	console.log('server listening on port : '+server.address().port);
})
