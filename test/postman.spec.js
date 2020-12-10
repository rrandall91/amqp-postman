const Postman = require("../lib");
const Connection = require("../lib/connection");
const Queue = require("../lib/queue");
const Exchange = require("../lib/exchange");
const Message = require("../lib/message");

const connectionString = "amqp://guest:guest@localhost/";
let postman;

beforeEach(() => {
  postman = Postman(connectionString);
});

afterEach(() => postman.disconnect());

describe(Postman, () => {
  it("should exist", () => {
    expect(typeof Postman).toBe("function");
  });

  it("should return an instance of Postman", () => {
    expect(postman).toBeInstanceOf(Postman);
  });

  describe("connection property", () => {
    it("should exist", () => {
      expect(postman).toHaveProperty("connection");
    });

    it("should be an instance of Connection", () => {
      expect(postman.connection).toBeInstanceOf(Connection);
    });
  });

  describe("messages property", () => {
    it("should exist", () => {
      expect(postman).toHaveProperty("messages");
    });

    it("should be an array", () => {
      expect(postman.messages).toBeInstanceOf(Array);
    });

    it("should be an array of Message instances", () => {
      postman.createMessage("test-message");
      expect(postman.messages[0]).toBeInstanceOf(Message);
    });
  });

  describe("createMessage function", () => {
    it("should exist", () => {
      expect(typeof postman.createMessage).toBe("function");
    });

    it("should append the messages property", () => {
      expect(postman.messages).toHaveLength(0);
      postman.createMessage("test");
      expect(postman.messages).toHaveLength(1);
    });
  });

  describe("setQueue function", () => {
    it ("should exist", () => {
      expect(typeof postman.setQueue).toBe("function");
    });

    it("should return a Queue", () => {
      const queue = postman.setQueue("test");

      expect(queue).toBeInstanceOf(Queue);
    });

    it("should set the queue property", () => {
      expect(typeof postman.queue).toBe("undefined");
      postman.setQueue("test");
      expect(postman.queue).toBeInstanceOf(Queue);
    });
  });

  describe("setExchange function", () => {
    it ("should exist", () => {
      expect(typeof postman.setExchange).toBe("function");
    });

    it("should return an Exchange", () => {
      const exchange = postman.setExchange("test", "direct");

      expect(exchange).toBeInstanceOf(Exchange);
    });

    it("should set the exchange property", () => {
      expect(typeof postman.exchange).toBe("undefined");
      postman.setExchange("test", "direct");
      expect(postman.exchange).toBeInstanceOf(Exchange);
    });
  });

  describe("connect function", () => {
    it("should exist", () => {
      expect(typeof postman.connect).toBe("function");
    });

    it("should return an instance of ChannelModel", async () => {
      const conn = await postman.connect();

      expect(conn.constructor.name).toBe("ChannelModel");
    });
  });

  describe("disconnect function", () => {
    it("should exist", () => {
      expect(typeof postman.disconnect).toBe("function");
    });

    it("should return undefined", () => {

      expect(typeof postman.disconnect()).toBe("undefined");
    });
  });

  describe("publishToExchange function", () => {
    it("should exist", () => {
      expect(typeof postman.publishToExchange).toBe("function");
    });

    it("should require an exchange to be defined", () => {
      postman.setExchange("test-exchange", "direct");
      postman.createMessage("test-message");
      expect(() => postman.publishToExchange()).not.toThrow(Error);
    });
  });

  describe("publishToQueue function", () => {
    it("should exist", () => {
      expect(typeof postman.publishToQueue).toBe("function");
    });

    it("should require a queue to be defined", () => {
      expect(() => postman.publishToQueue()).toThrow(Error);
    });

    it("should not return an error", () => {
      postman.setQueue("test-queue");
      postman.createMessage("test-message");
      expect(() => postman.publishToQueue()).not.toThrow(Error);
    });
  });
});
