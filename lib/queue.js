'use strict';

function Queue(routingKey, options = {}) {
    if (!(this instanceof Queue)) {
        return new Queue(routingKey, options);
    }

    if (typeof routingKey !== 'string') {
        throw new TypeError('Invalid argument for parameter 1: Expected string')
    }

    this.routingKey = routingKey;
    this.setOptions(options);
}


Queue.prototype.setOptions = function (options = {}) {
    this.options = Object.assign({}, this._defaultOptions, options);
}


Queue.prototype._defaultOptions = {};


module.exports = Queue;