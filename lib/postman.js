'use strict';

const Message = require('./message');


function Postman(connectionString) {
    if (!(this instanceof Postman)) {
        return new Postman(connectionString);
    }

    if (typeof connectionString === 'undefined') {
        throw new TypeError('Connection string not provided');
    } else if (/^(amqp:\/\/)(.*)$/.test(connectionString) === false) {
        throw new TypeError('Invalid connection string (ex. amqp://hostname)');
    }

    this.connectionString = connectionString;
}


Postman.prototype.createMessage = function (content = {}, options = {}) {
    return Message(content, options);
}


module.exports = Postman;