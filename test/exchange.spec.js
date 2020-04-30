'use strict';

const Exchange = require('../lib/exchange');
let exchange, name, type, routingKey, options;


beforeEach(() => {
    name = 'Test';
    type = 'topic';
    routingKey = '';
    options = {
        durable: false
    };

    exchange = Exchange(name, type, routingKey, options);
});


describe('Exchange', () => {
    it('should exist', () => {
        expect(typeof Exchange).toBe('function');
    });


    describe('name property', () => {
        it('should be required', () => {
            const instance = () => Exchange();
            expect(instance).toThrow(TypeError);
            expect(instance).toThrowError('Invalid argument for parameter 1: Expected string');
        });


        it('should be a string value', () => {
            const instance = () => Exchange(123, type);
            expect(instance).toThrow(TypeError);
            expect(instance).toThrowError('Invalid argument for parameter 1: Expected string');
        });
    });


    describe('type property', () => {
        it('should be required', () => {
            const instance = () => Exchange(name);
            expect(instance).toThrow(TypeError);
            expect(instance).toThrowError('Invalid argument for parameter 2: Expected string');
        });


        it('should be a string value', () => {
            const instance = () => Exchange(name, 1);
            expect(instance).toThrow(TypeError);
            expect(instance).toThrowError('Invalid argument for parameter 2: Expected string');
        });


        it('should be set to "direct" if a valid type is not provided', () => {
            const exchange = Exchange(name, 'test', 'test');
            expect(exchange.type).toBe('direct');
        })
    });


    describe('routingKey property', () => {
        it('should be required', () => {
            const instance = () => Exchange(name, type);
            expect(instance).toThrow(TypeError);
            expect(instance).toThrowError('Invalid argument for parameter 3: Expected string');
        });


        it('should be a string value', () => {
            const instance = () => Exchange(name, type, 1);
            expect(instance).toThrow(TypeError);
            expect(instance).toThrowError('Invalid argument for parameter 3: Expected string');
        });


        it('should be the provided value', () => {
            expect(exchange.routingKey).toBe(routingKey);
        })
    });


    describe('options property', () => {
        it('should equal default value if not provided', () => {
            exchange = Exchange(name, type, routingKey, options);
            expect(typeof exchange.options).not.toBe('undefined');
            expect(exchange.options).not.toBe(null);
            expect(exchange.options).toEqual(expect.objectContaining(exchange._defaultOptions));
        });


        it('should only accept an object', () => {
            const exchange = Exchange(name, type, routingKey, 'invalid');
            expect(exchange.options).not.toEqual('invalid');
            expect(exchange.options).toEqual(expect.objectContaining(exchange._defaultOptions));
        });


        it('should equal provided value', () => {
            expect(exchange.options).toEqual(expect.objectContaining(options));
        });
    });
});