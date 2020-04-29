'use strict';

const Postman = require('../lib');
const Message = require('../lib/message');
const connectionString = process.env.CONNECTION_STRING || 'amqp://localhost';
let postman;

beforeEach(() => {
    postman = Postman(connectionString);
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


        describe('createMessage function', () => {
            it('should return a Message object', () => {
                const message = postman.createMessage();
                expect(message instanceof Message).toBe(true);
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
    });
});