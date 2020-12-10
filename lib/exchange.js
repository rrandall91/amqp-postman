const EXCHANGE_TYPES = [ "direct", "headers", "fanout", "topic" ];

function Exchange(name, type, options = {}) {
  if (typeof name !== "string") {
    throw TypeError("name parameter should be a string");
  }

  if (typeof type !== "string" || !(EXCHANGE_TYPES.includes(type))) {
    throw TypeError("type parameter is invalid | valid options: [direct, headers, fanout, topic]");
  }

  if (!(this instanceof Exchange)) {
    return new Exchange(name, type);
  }

  this.name = name;
  this.type = type;
  this.routingKey = "";
  this.options = options;
}

Exchange.prototype.setRoutingKey = function setRoutingKey(routingKey) {
  this.routingKey = routingKey;
};

module.exports = Exchange;
