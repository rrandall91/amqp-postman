'use strict';

const Postman = require('../lib');
const Message = require('../lib/message');
const Connection = require('../lib/connection');
const connectionString = process.env.CONNECTION_STRING || 'amqp://localhost';
let postman, queue, exchange;

beforeEach(() => {
    postman = Postman(connectionString);
    queue = 'test';
});


afterEach(() => {
    postman.connection.close();
});


describe('Postman', () => {
    it('should exist', () => {
        expect(typeof Postman).toBe('function');
    });


    describe('Instance', () => {
        describe('connectionString property', () => {
            it('should require a connection string', () => {
                const initialize = () => Postman();
                expect(initialize).toThrow(TypeError);
                expect(initialize).toThrowError('Connection string not provided');
            });


            it('should contain valid format', () => {
                const initialize = () => Postman(connectionString.replace('amqp://', ''));
                expect(initialize).toThrow(TypeError);
                expect(initialize).toThrowError('Invalid connection string (ex. amqp://hostname)');
            });


            it('should equal value provided to constructor', () => {
                expect(postman.connectionString).toMatch(/^(amqp:\/\/)(.*)$/);
                expect(postman.connectionString).toEqual(connectionString);
            });
        });


        describe('connection property', () => {
            it('should return a Connection object', () => {
                expect(postman.connection).toBeInstanceOf(Connection);
            });
        });


        describe('createMessage function', () => {
            it('should return a Message object', () => {
                const message = postman.createMessage();
                expect(message).toBeInstanceOf(Message);
            });


            it('should return a Message object matching provided values', () => {
                const content = {
                    "service": "postman",
                    "payload": {
                        "userId": 1,
                        "body": "test"
                    }
                };

                const options = {
                    "app-id": "postman-test"
                };

                const message = postman.createMessage(content, options);
                expect(message.content).toEqual(expect.objectContaining(content));
                expect(message.options).toEqual(expect.objectContaining(options));
            });
        });


        describe('publishMessage function', () => {
            it('should require a message argument', () => {
                const instance = () => postman.publishMessage();
                expect(instance).toThrow(TypeError);
                expect(instance).toThrowError('Missing agrument for parameter 1: Expected instance of Message');
            });


            it('should require the message argument to be a Message object', () => {
                const instance = () => postman.publishMessage({});
                expect(instance).toThrow(TypeError);
                expect(instance).toThrowError('Invalid argument type: Expected instance of Message');
            });


            it('should require either an exchange or a queue to be defined', () => {
                const message = postman.createMessage();
                const instance = () => postman.publishMessage(message);
                expect(instance).toThrow(TypeError);
                expect(instance).toThrowError('Publishing a message requires either an exchange or a queue to be defined');
            });


            it('should publish a message with a defined queue', () => {
                const message = postman.createMessage();
                postman.setQueue('test');
                const instance = () => postman.publishMessage(message);
                expect(instance).not.toThrow(Error);
            });


            it('should publish a message with a defined exchange', () => {
                const message = postman.createMessage();
                postman.setExchange('test', 'direct', 'test');
                const instance = () => postman.publishMessage(message);
                expect(instance).not.toThrow(Error);
            });


            it.skip('should publish a message', () => {
                const message = postman.createMessage();
                const instance = () => postman.publishMessage(message);
                expect(instance).not.toThrow(Error);
            });
        });


        describe('consume function', () => {
            it.skip('should consume messages from the queue', () => {
                const message = postman.createMessage();
                postman.publishMessage(message, testQueue);
                const instance = () => postman.consume(testQueue, true, (msg) => {
                    expect(JSON.parse(msg.content)).toEqual(expect.objectContaining(message.content))
                });
                expect(instance).not.toThrow(Error)
            });
        });
    });
});