const Queue = require("../lib/queue");

let queue;

beforeEach(() => {
  queue = Queue("test");
});

describe(Queue, () => {
  it("should exist", () => {
    expect(typeof Queue).toBe("function");
  });
  
  it("should return an instance of Queue", () => {
    expect(queue).toBeInstanceOf(Queue);
  });

  describe("name property", () => {
    it("should exist", () => {
      expect(queue).toHaveProperty("name");
    });

    it("should return an error if not present", () => {
      expect(() => Queue()).toThrow(TypeError);
    });

    it("should be a string", () => {
      expect(typeof queue.name).toBe("string");
    });

    it("should be set by the constructor", () => {
      const queueName = "random-test-string";
      const q = Queue(queueName);

      expect(q.name).toBe(queueName);
    });
  });

  describe("options property", () => {
    it("should exist", () => {
      expect(queue).toHaveProperty("options");
    });

    it("should be an object", () => {
      expect(typeof queue.options).toBe("object");
    });
  });
});
