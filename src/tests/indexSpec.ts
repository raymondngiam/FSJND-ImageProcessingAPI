import _ from "../index";

// dummy test
it("should add two numbers", async () => {
  const data = _.add(3,4);
  expect(data).toEqual(7);
});