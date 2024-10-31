import { parseCoordinates } from "../app.js";

describe("parseCoordinates", () => {
  const testCases = [
    ["51.50851, -0.12572", "51.50851, -0.12572"],
    ["51.50851,-0.12572", "51.50851, -0.12572"],
    ["[51.50851, -0.12572]", "51.50851, -0.12572"],
  ];

  testCases.forEach(([input, expected]) => {
    test(`should parse coordinates from "${input}"`, () => {
      expect(parseCoordinates(input)).toBe(expected);
    });
  });

  test("should show alert for invalid format", () => {
    global.alert = jest.fn();
    parseCoordinates("invalid input");
    expect(global.alert).toHaveBeenCalledWith("Невалидный формат");
  });

  test("should show alert for out of range latitude", () => {
    global.alert = jest.fn();
    parseCoordinates("100, 0");
    expect(global.alert).toHaveBeenCalledWith("Невалидный формат");
  });
});
