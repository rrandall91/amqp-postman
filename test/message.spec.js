const Message = require("../lib/message");

let message;

beforeEach(() => {
  message = Message("test-message");
});

describe(Message, () => {
  it("should exist", () => {
    expect(typeof Message).toBe("function");
  });

  it("should return an instance of Message", () => {
    expect(message).toBeInstanceOf(Message);
  });

  describe("content property", () => {
    expect(() => Message()).toThrow(TypeError);
  });
});
