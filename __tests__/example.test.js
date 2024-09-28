describe("Jest Setup", () => {
  beforeAll(() => {
    // Mock the localStorage object
    let store = {};

    global.localStorage = {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value;
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
    };
  });
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });

  test("object assignment", () => {
    const data = { one: 1 };
    data["two"] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
  });

  test("localStorage mock works", () => {
    localStorage.setItem("testKey", "testValue");
    expect(localStorage.getItem("testKey")).toBe("testValue");
  });
});
