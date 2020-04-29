'use strict';

const Connection = require('../lib/connection');
const connectionString = process.env.CONNECTION_STRING || 'amqp://localhost'
let connection;


beforeEach(() => {
    connection = Connection(connectionString);
});


afterEach(() => connection.close());


describe('Connection', () => {
    it('should exist', () => {
        expect(typeof Connection).toBe('function');
    });


    describe('client property', () => {
        it('should be a ChannelModel', async () => {
            const conn = await connection.initialize();
            expect(conn.constructor.name).toBe('ChannelModel');
        });
    });


    describe('close function', () => {
        it('should exist', () => {
            expect(typeof connection.close).toBe('function');
        })
    })
});