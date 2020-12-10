const Mailbox = require("../lib/mailbox");

let mailbox;

beforeEach(() => {
  mailbox = Mailbox();
});

describe(Mailbox, () => {
  it("should exist", () => {
    expect(typeof Mailbox).toBe("function");
  });

  it("should return an instance of Mailbox", () => {
    expect(mailbox).toBeInstanceOf(Mailbox);
  });
});
