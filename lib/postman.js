const Connection = require("./connection");
const Queue = require("./queue");
const Exchange = require("./exchange");
const Message = require("./message");

function Postman(connectionString) {
  if (!(this instanceof Postman)) {
    return new Postman(connectionString);
  }

  this.connection = Connection(connectionString);
  this.messages = [];
}

Postman.prototype.getMessages = function getMessages() {
  return this.messages;
};

Postman.prototype.setMessages = function setMessages(messages) {
  this.messages = messages;
};

Postman.prototype.createMessage = function createMessage(content, options) {
  const message = Message(content, options);

  this.messages.push(message);
};

Postman.prototype.setExchange = function setExchange(name, type, options) {
  this.exchange = Exchange(name, type, options);
  return this.exchange;
};

Postman.prototype.setQueue = function setQueue(name) {
  this.queue = Queue(name);
  return this.queue;
};

Postman.prototype.connect = function connect() {
  return this.connection.open();
};

Postman.prototype.disconnect = function disconnect() {
  this.connection.close();
};

Postman.prototype.publishToExchange = function publishToExchange() {
  if (!(this.exchange instanceof Exchange)) {
    throw Error("Publishing requires an exchange to be defined");
  }

  if (this.messages.length === 0) {
    throw Error("There are no messages to publish");
  }

  this.connect().then(conn => conn.createChannel())
    .then((ch) => ch.assertExchange(this.exchange.name, this.exchange.type, this.exchange.options)
      .then(() => {
        for (const message of this.messages) {
          try {
            ch.publish(this.exchange.name, this.exchange.routingKey, message.content, message.options);
          } catch (error) {
            console.error(error);
          }
        }

        return ch.close();
      })).finally(() => this.disconnect());
};

Postman.prototype.publishToQueue = function publishToQueue() {
  if (!(this.queue instanceof Queue)) {
    throw Error("Publishing requires a queue to be defined");
  }

  if (this.messages.length === 0) {
    throw Error("There are no messages to publish");
  }

  this.connect().then((conn) => conn.createChannel())
    .then((ch) => 
      ch.assertQueue(this.queue.name, this.queue.options)
        .then(() => {
          for (const message of this.messages) {

            try {
              ch.sendToQueue(this.queue.name, message.content, message.options);
            } catch (error) {
              console.log(error);
            }
          }

          return ch.close();
        })).finally(() => this.disconnect());
};

module.exports = Postman;
