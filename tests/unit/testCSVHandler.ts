import { expect, test } from "vitest";
<<<<<<< HEAD
import { useCSVHandler, Dataset } from "/Users/fernandachavez/Desktop/cs32/mock-mchavezz-lhalim/src/components/REPLFunction";
=======
import {
  useCSVHandler,
  Dataset,
} from "/Users/linahalim/Desktop/cs0320/mock-mchavezz-lhalim/src/components/REPLFunction.tsx";
>>>>>>> edcabfee44d7defd182800904c9ddf8f5a603eb2

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
