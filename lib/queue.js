function Queue(name, options = {}) {
  if (typeof name !== "string") {
    throw TypeError("name parameter should be a string");
  }

  if (!(this instanceof Queue)) {
    return new Queue(name);
  }

  this.name = name;
  this.options = options;
}

module.exports = Queue;
