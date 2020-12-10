function Message(content, options = {}) {
  if (typeof content === "undefined") {
    throw TypeError("content parameter cannot be undefined");
  }

  if (!(this instanceof Message)) {
    return new Message(content, options);
  }

  this.content = Buffer.from(content);
  this.options = options;
}

module.exports = Message;
