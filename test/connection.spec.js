const Connection = require("../lib/connection");

const connectionString = "amqp://guest:guest@localhost/";
let connection;

beforeEach(() => {
  connection = Connection(connectionString);
});

afterEach(() => connection.close());

describe(Connection, () => {
  it("should exist", () => {
    expect(typeof Connection).toBe("function");
  });

  it("should return an instance of Connection", () => {
    expect(connection).toBeInstanceOf(Connection);
  });

  describe("connectionString property", () => {
    it("should exist", () => {
      expect(connection).toHaveProperty("connectionString");
    });

    it("should return an error if not present", () => {
      expect(() => Connection()).toThrow(TypeError);
    });

    it("should return an error if not a string", () => {
      expect(() => Connection(123)).toThrow(TypeError);
    });
  });

  describe("connect function", () => {
    it ("should exist", () => {
      expect(connection).toHaveProperty("open");
      expect(typeof connection.open).toBe("function");
    });

    it("should return an instance of ChannelModel", async () => {
      const conn = await connection.open();

      expect(conn.constructor.name).toBe("ChannelModel");
    });
  });

  describe("close function", () => {
    it ("should exist", () => {
      expect(connection).toHaveProperty("close");
      expect(typeof connection.close).toBe("function");
    });
  });
});
