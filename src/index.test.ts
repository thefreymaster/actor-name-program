import parser from "./index";

test("getUniqueNames", () => {
  const names = ["Evan", "Liz", "Evan"];
  expect(parser.unique.names(names)).toStrictEqual(["Evan", "Liz"]);
});

test("getUniqueFirstNames", () => {
  const names = ["Frey, Evan", "Butler, Liz", "Frey, Evan"];
  expect(parser.unique.first(names)).toStrictEqual(["Evan", "Liz"]);
});

test("getUniqueLastNames", () => {
  const names = ["Frey, Evan", "Butler, Liz", "Frey, Evan"];
  expect(parser.unique.last(names)).toStrictEqual(["Frey", "Butler"]);
});

// test("getSpecificallyUnique", () => {
//   const names = [
//     "Frey, Evan",
//     "Butler, Liz",
//     "Evan, Frey",
//     "Troy, Butler",
//     "Lola, Miller",
//   ];
//   expect(parser.unique.specifically(names, 5)).toStrictEqual(["Lola, Miller"]);
// });
