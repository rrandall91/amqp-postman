'use strict';

function Exchange(name, type, routingKey, options = {}) {
    if (!(this instanceof Exchange)) {
        return new Exchange(name, type, routingKey, options);
    }

    if (typeof name !== 'string') {
        throw new TypeError('Invalid argument for parameter 1: Expected string')
    } else if (typeof type !== 'string') {
        throw new TypeError('Invalid argument for parameter 2: Expected string')
    } else if (typeof routingKey !== 'string') {
        throw new TypeError('Invalid argument for parameter 3: Expected string')
    }

    this.name = name;
    this.routingKey = routingKey;
    this.setType(type);
    this.setOptions(options);
}


Exchange.prototype.setType = function (type) {
    const validTypes = ['direct', 'headers', 'fanout', 'topic'];
    if (validTypes.includes(type)) {
        this.type = type;
    } else {
        this.type = 'direct';
    }
}


Exchange.prototype.setOptions = function (options = {}) {
    this.options = Object.assign({}, this._defaultOptions, options);
}


Exchange.prototype._defaultOptions = {};


module.exports = Exchange;