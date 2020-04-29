# Postman

Postman is a Node.JS utility for publishing and consuming events from AMQP message brokers, such as RabbitMQ. It provides a simple, high-level API that handles the creation, publishing, and consuming of messages by abstracting the functionality of the `amqplib` library.

## Installation

```bash
npm install amqp-postman

## or using Yarn
yarn install amqp-postman
```

## Usage Example

Postman is initialized with an AMQP connection string.

```javascript
// Require the library
const Postman = require('amqp-postman');


const postman = Postman('amqp://hostname:port');
// or using authentication
const postman = Postman('amqp://username:password@hostname:port');


// Create a message
const message = postman.createMessage({
    "payload": {
        "body": "This is a sample message"
    }
}, {
    "appId": "Example"
});
```