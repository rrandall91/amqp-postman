const amqplib = require("amqplib");

function Connection(connectionString) {
  if (typeof connectionString !== "string") {
    throw TypeError("connectionString should be a string");
  }

  if (!(this instanceof Connection)) {
    return new Connection(connectionString);
  }

  this.connectionString = connectionString;
  this.client = null;
}

Connection.prototype.open = async function open() {
  this.client = await amqplib.connect(this.connectionString);
  return this.client;
};

Connection.prototype.close = function close() {
  if (this.client !== null) {
    this.client.close();
  }
};

module.exports = Connection;
