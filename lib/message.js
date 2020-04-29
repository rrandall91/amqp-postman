'use strict';

function Message(content = {}, options = {}) {
    if (!(this instanceof Message)) {
        return new Message(content, options);
    }

    this.setContent(content);
    this.setOptions(options);
}


Message.prototype.setContent = function (content = {}) {
    this.content = Object.assign({}, this._defaultContent, content);
}


Message.prototype.setOptions = function (options = {}) {
    this.options = Object.assign({}, this._defaultOptions, options);
}


Message.prototype._defaultContent = {};


Message.prototype._defaultOptions = {
    "contentType": "application/json",
    "contentEncoding": "utf-8",
    "appId": null,
    "type": null,
    "timestamp": new Date().getTime(),
    "priority": 1
};


module.exports = Message;