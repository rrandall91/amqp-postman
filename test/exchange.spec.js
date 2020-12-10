const Exchange = require("../lib/exchange");

let exchange;

beforeEach(() => {
  exchange = Exchange("exchange", "topic");
});

describe(Exchange, () => {
  it("should exist", () => {
    expect(typeof Exchange).toBe("function");
  });

  it("should return an instance of Exchange", () => {
    expect(exchange).toBeInstanceOf(Exchange);
  });

  describe("name property", () => {
    it("should exist", () => {
      expect(exchange).toHaveProperty("name");
    });

    it("should return an error if not present", () => {
      expect(() => Exchange()).toThrow();
    });

    it("should be a string", () => {
      expect(typeof exchange.name).toBe("string");
    });

    it("should be set by the constructor", () => {
      const exchangeName = "random-test-string";
      const e = Exchange(exchangeName, "topic");

      expect(e.name).toBe(exchangeName);
    });
  });

  describe("type property", () => {
    it("should exist", () => {
      expect(exchange).toHaveProperty("type");
    });

    it("should return an error if not present", () => {
      expect(() => Exchange("test")).toThrow(TypeError);
    });

    it("should return an error if invalid option", () => {
      expect(() => Exchange("test", "invalid-type")).toThrow(TypeError);
    });

    it("should be a string", () => {
      expect(typeof exchange.type).toBe("string");
    });

    it("should be set by the constructor", () => {
      const exchangeType = "direct";
      const e = Exchange("random-test-string", exchangeType);

      expect(e.type).toBe(exchangeType);
    });
  });

  describe("options property", () => {
    it("should exist", () => {
      expect(exchange).toHaveProperty("options");
    });

    it("should be an object", () => {
      expect(typeof exchange.options).toBe("object");
    });
  });

  describe("setRoutingKey function", () => {
    it ("should exist", () => {
      expect(typeof exchange.setRoutingKey).toBe("function");
    });
  
    it("should set the routingKey property", () => {
      const routingKey = "routing.key";

      expect(typeof exchange.routingKey).toBe("string");
      exchange.setRoutingKey(routingKey);
      expect(exchange.routingKey).toBe(routingKey);
    });
  });
});
