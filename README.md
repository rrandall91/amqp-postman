# Postman

**Note: This project is still under active development.**

Postman is a Node.JS utility for publishing and consuming events from AMQP message brokers, such as RabbitMQ. It provides a simple, high-level API that handles the creation, publishing, and consuming of messages by abstracting the functionality of the `amqplib` library.

## Installation

```bash
npm install amqp-postman
```

## Usage Example (Publisher)

Postman is initialized with an AMQP connection string.

```javascript
// Require the library
const Postman = require('amqp-postman');


const postman = Postman('amqp://hostname:port');
// or using authentication
const postman = Postman('amqp://username:password@hostname:port');


// Create a message
const postman.createMessage({
    // message content
    "payload": {
        "body": "This is a sample message"
    }
}, {
    // message options
    "contentType": "application/json",
    "contentEncoding": "utf-8",
    "appId": "Example",
    "timestamp": new Date().getTime(),
    "priority": 1
});

// Set Exchange & Queue
postman.setExchange('example', 'direct', {
    durable: true
});

postman.setQueue('example.key', {
    durable: true
});


// Publish message (requires exchange and/or queue to be set prior to execution)
postman.publishMessage(message);
```

## Usage Example (Consumer)

```javascript
// Require the library
const Postman = require('amqp-postman');


const postman = Postman('amqp://hostname:port');
// or using authentication
const postman = Postman('amqp://username:password@hostname:port');


// Consume and print messages to console
postman.consume((message) => {
    console.log(message);
});

// Optionally turn off acknowledgement
postman.consume((message) => {
    console.log(message);
}, false);
```