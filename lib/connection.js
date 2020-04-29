'use strict';

const amqp = require('amqplib');


function Connection(connectionString) {
    if (!(this instanceof Connection)) {
        return new Connection(connectionString);
    }

    this.connectionString = connectionString;
}


Connection.prototype.initialize = function () {
    return amqp.connect(this.connectionString)
        .then(conn => this.client = conn);
}


Connection.prototype.close = function () {
    if (typeof this.client !== 'undefined') {
        return this.client.close();
    }
}


module.exports = Connection;