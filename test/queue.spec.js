'use strict';

const Queue = require('../lib/queue');
let queue, routingKey, options;


beforeEach(() => {
    routingKey = 'test';
    options = {
        durable: false
    };
    queue = Queue(routingKey, options);
});


describe('Queue', () => {
    it('should exist', () => {
        expect(typeof Queue).toBe('function');
    });


    describe('routingKey property', () => {
        it('should be required', () => {
            const instance = () => Queue();
            expect(instance).toThrow(TypeError);
            expect(instance).toThrowError('Invalid argument for parameter 1: Expected string');
        });


        it('should be a string', () => {
            const instance = () => Queue(123);
            expect(instance).toThrow(TypeError);
            expect(instance).toThrowError('Invalid argument for parameter 1: Expected string');
        });
    });


    describe('options property', () => {
        it('should equal default value if not provided', () => {
            queue = Queue(routingKey, options);
            expect(typeof queue.options).not.toBe('undefined');
            expect(queue.options).not.toBe(null);
            expect(queue.options).toEqual(expect.objectContaining(queue._defaultOptions));
        });


        it('should only accept an object', () => {
            const queue = Queue(routingKey, 'invalid');
            expect(queue.options).not.toEqual('invalid');
            expect(queue.options).toEqual(expect.objectContaining(queue._defaultOptions));
        });


        it('should equal provided value', () => {
            expect(queue.options).toEqual(expect.objectContaining(options));
        });
    });
});