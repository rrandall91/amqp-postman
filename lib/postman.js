'use strict';

const Message = require('./message');
const Connection = require('./connection');


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
    this.connection = Connection(connectionString);
}


Postman.prototype.createMessage = function (content = {}, options = {}) {
    return Message(content, options);
}


Postman.prototype.publishMessage = function (message, routingKey) {
    if (typeof message === 'undefined') {
        throw new TypeError('Missing agrument for parameter 1: Expected instance of Message')
    } else if (typeof routingKey === 'undefined') {
        throw new TypeError('Missing agrument for parameter 2: Expected String')
    }

    if (!(message instanceof Message)) {
        throw new TypeError('Invalid argument type: Expected instance of Message');
    }

    this.connection.initialize()
        .then(conn => conn.createChannel())
        .then(ch => {
            return ch.assertQueue(routingKey, {
                    durable: true
                })
                .then(() => {
                    ch.sendToQueue(routingKey, Buffer.from(JSON.stringify(message.content)), message.options);
                    return ch.close();
                })
        }).finally(() => this.connection.close())
        .catch(err => console.log(err))
}


Postman.prototype.consume = function (routingKey, callback = function () {}, acknowledge = true) {
    console.log('Waiting for messages. To exit, press CTRL+C');
    this.connection.initialize()
        .then(conn => {
            process.once('SIGINT', () => conn.close());
            return conn.createChannel()
        })
        .then(ch => {
            return ch.assertQueue(routingKey, {
                    durable: true
                })
                .then(() => ch.consume(routingKey, (msg) => {
                    callback(msg);

                    if (acknowledge === true) {
                        ch.ack(msg);
                    }
                }));
        })
}


module.exports = Postman;