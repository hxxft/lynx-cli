var WebSocketServer = require('ws').Server;
var debugger_server = new WebSocketServer({ port: 9527 });

debugger_server.broadcast = function (msg) {
    this.clients.forEach(function each(client) {
        client.send(JSON.stringify(msg));
    });
}

debugger_server.on('connection', function (ws) {
    ws.on('message', function (msg) {
        process.send(msg);
    });
    ws.on('close', function () {
    });
});



process.on('message', function(msg) {
    debugger_server.broadcast(msg.message);
});
