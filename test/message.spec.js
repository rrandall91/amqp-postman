'use strict';

const Message = require('../lib/message');
let message, content, options;

beforeEach(() => {
    content = {
        "service": "test",
        "payload": {
            "body": "testing"
        }
    };

    options = {
        "contentType": "application/json",
        "contentEncoding": "utf-8",
        "appId": "test-app",
        "type": "test",
        "timestamp": new Date().getTime(),
        "priority": 1
    };

    message = Message(content, options);
});


describe('Message', () => {
    it('should exist', () => {
        expect(typeof Message).toBe('function');
    });


    describe('Instance', () => {
        describe('content property', () => {
            it('should equal default value if not provided', () => {
                message = Message();
                expect(typeof message.content).not.toBe('undefined');
                expect(message.content).not.toBe(null);
                expect(message.content).toEqual(expect.objectContaining(message._defaultContent));
            });


            it('should only accept an object', () => {
                const message = Message('invalid');
                expect(message.content).not.toEqual('invalid');
                expect(message.content).toEqual(expect.objectContaining(message._defaultContent));
            });


            it('should equal provided value', () => {
                expect(message.content).toEqual(expect.objectContaining(content));
            });
        });


        describe('options property', () => {
            it('should equal default value if not provided', () => {
                message = Message();
                expect(typeof message.options).not.toBe('undefined');
                expect(message.options).not.toBe(null);
                expect(message.options).toEqual(expect.objectContaining(message._defaultOptions));
            });


            it('should only accept an object', () => {
                const message = Message('invalid');
                expect(message.options).not.toEqual('invalid');
                expect(message.options).toEqual(expect.objectContaining(message._defaultOptions));
            });


            it('should equal provided value', () => {
                expect(message.options).toEqual(expect.objectContaining(options));
            });
        });
    });
});