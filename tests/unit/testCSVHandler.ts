import { expect, test } from "vitest";
import { useCSVHandler, Dataset } from "/Users/fernandachavez/Desktop/cs32/mock-mchavezz-lhalim/src/components/REPLFunction";

test("loadCSV should load a CSV file successfully", () => {
  const { loadCSV } = useCSVHandler();
  const filePath = "test.csv";

  const result = loadCSV(filePath);

  expect(result).toBe(`CSV file '${filePath}' loaded successfully.`);
});

test("unloadCSV should unload the current dataset", () => {
  const { loadCSV, unloadCSV } = useCSVHandler();
  const filePath = "test.csv";

  loadCSV(filePath);
  const result = unloadCSV();

  expect(result).toBe("Dataset unloaded successfully.");
});

test("switchDataset should switch to the specified dataset", () => {
  const { loadCSV, switchDataset } = useCSVHandler();
  const filePath1 = "test1.csv";
  const filePath2 = "test2.csv";

  loadCSV(filePath1);
  loadCSV(filePath2);
  const result = switchDataset(0);

  expect(result).toBe(`Switched to dataset '${filePath1}'.`);
});

test("viewCSV should return HTML table representation of the current dataset", () => {
  const { loadCSV, viewCSV } = useCSVHandler();
  const filePath = "test.csv";

  loadCSV(filePath);
  const expectedHTML = `<h2>${filePath}</h2><table><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>John</td><td>30</td></tr><tr><td>Jane</td><td>25</td></tr></tbody></table>`;
  const result = viewCSV();

  expect(result).toBe(expectedHTML);
});
