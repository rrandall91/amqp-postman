'use strict';

const Message = require('./message');
const Exchange = require('./exchange');
const Queue = require('./queue');
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
    return this.message = Message(content, options);
}


Postman.prototype.setExchange = function (name, type, routingKey, options = {}) {
    return this.exchange = Exchange(name, type, routingKey, options);
}


Postman.prototype.setQueue = function (routingKey, options = {}) {
    return this.queue = Queue(routingKey, options);
}


Postman.prototype.publishMessage = function (message) {
    if (typeof message === 'undefined') {
        throw new TypeError('Missing agrument for parameter 1: Expected instance of Message')
    }

    if (!(message instanceof Message)) {
        throw new TypeError('Invalid argument type: Expected instance of Message');
    }

    if (!(this.queue instanceof Queue) && !(this.exchange instanceof Exchange)) {
        throw new TypeError('Publishing a message requires either an exchange or a queue to be defined');
    }

    this.connection.initialize()
        .then(conn => conn.createChannel())
        .then(ch => {
            if (this.exchange instanceof Exchange) {
                return ch.assertExchange(this.exchange.name, this.exchange.type, this.exchange.options)
                    .then(() => {
                        ch.publish(this.exchange.name, this.exchange.routingKey, Buffer.from(JSON.stringify(message.content)), message.options);
                        return ch.close();
                    });
            } else if (this.queue instanceof Queue) {
                return ch.assertQueue(this.queue.routingKey, this.queue.options)
                    .then(() => {
                        ch.sendToQueue(this.queue.routingKey, Buffer.from(JSON.stringify(message.content)), message.options);
                        return ch.close();
                    });
            }
        }).finally(() => this.connection.close())
        .catch(err => console.log(err))
}


Postman.prototype.consume = function (callback = function () {}, acknowledge = true) {
    console.log('Waiting for messages. To exit, press CTRL+C');
    this.connection.initialize()
        .then(conn => {
            process.once('SIGINT', () => conn.close());
            return conn.createChannel()
        })
        .then(ch => {
            if (this.exchange instanceof Exchange && this.queue instanceof Queue) {
                ch.assertExchange(this.exchange.name, this.exchange.type, this.exchange.options);

                return ch.assertQueue(this.queue.routingKey, this.queue.options)
                    .then((q) => {
                        ch.bindQueue(this.queue.routingKey, this.exchange.name, this.exchange.routingKey)
                        ch.consume(this.queue.routingKey, (msg) => {
                            callback(msg);

                            if (acknowledge === true) {
                                ch.ack(msg);
                            }
                        })
                    });
            } else if (this.queue instanceof Queue) {
                return ch.assertQueue(this.queue.routingKey, this.queue.options)
                    .then(() => ch.consume(this.queue.routingKey, (msg) => {
                        callback(msg);

                        if (acknowledge === true) {
                            ch.ack(msg);
                        }
                    }));
            }
        })
}


module.exports = Postman;