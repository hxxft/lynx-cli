const logger = require('./logger')
const child_process = require('child_process')

function makeDebugMessage(msg) {
    var message = {
        fromType: 'server',
        commandType: 'debug',
        content: {
            method: msg
        }
    }
    return message 
}

module.exports = function() {
    var debug_client = new Object();
    debug_client.debug_process = child_process.fork(__dirname + '/debug_process.js');
    debug_client.debug_process.on('message', function(msg){
        var message = JSON.parse(msg)
        switch(message.commandType){
            case "log":
                logger.remoteConsoleLog(message.content);
                break;
            default:
                break;
        }
    });

    
    debug_client.send = function(cmd) {
        if(this.debug_process) {
            this.debug_process.send({message: makeDebugMessage(cmd)}) 
        }else{
            logger.fatal('ERROR: Debug Process Not Exist!')
        } 
    }

    debug_client.destroy = function() {
        this.debug_process.kill(); 
    }
    
    return debug_client
}








