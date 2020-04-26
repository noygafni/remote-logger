import axios from 'axios';

class RemoteLogger {
    constructor(options) {

        if (!options || typeof options !== 'object') {
          throw new Error('options are required, and must be an object');
        }
    
        if (!options.url) {
          throw new Error('options must include a url property');  
        }
    
        this.url = options.url;
        this.batchSize = options.batchSize || 1;
        this.messages = [];    
    }

    initMessages() {
        this.messages = [];
    }

    getMessagesToSend() {
        return this.messages;
    }
    
    send(messages) {
        axios.post(this.url, messages);
    }

    log(level, message) {
        this.messages.push({
            level,
            message
        })
        if (this.messages.length >= this.batchSize) {
            this.send(this.messages);
            this.initMessages();
        }
    }

    info(message) {
        this.log('info', message);
    }

    debug(message) {
        this.log('debug', message);
    }

    warn(message) {
        this.log('warn', message);
    }
    
    error(message) {
        this.log('error', message);
    }

}

export default RemoteLogger;