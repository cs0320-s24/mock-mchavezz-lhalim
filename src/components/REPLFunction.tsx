import { useState } from "react";
import "/Users/fernandachavez/Desktop/cs32/mock-mchavezz-lhalim/src/mocked_dataJson";
import {
  mocked_data,
  mocked_data_2,
  mocked_data_3,
  mocked_data_4,
  mocked_data_5,
  mocked_data_6,
} from "/Users/fernandachavez/Desktop/cs32/mock-mchavezz-lhalim/src/mocked_dataJson";
import { mock } from "node:test";

export interface Dataset {
  name: string;
  data: string[][];
  headers: string[];
}

export interface REPLFunction {
  loadedDatasets: Dataset[];
  currentDataset: Dataset | null;
  currentDatasetIndex: number | null;
  loadCSV: (filePath: string) => string;
  unloadCSV: () => string;
  switchDataset: (index: number) => string;
  viewCSV: (props: Dataset) => JSX.Element | string;
}


export function useCSVHandler(): REPLFunction {
  const [loadedDatasets, setLoadedDatasets] = useState<Dataset[]>([]);
  const [currentDatasetIndex, setCurrentDatasetIndex] = useState<number | null>(
    null
  );


  const loadCSV = (filePath: string) => {

   const dataMap: { [index: string]: string[][] } = {
     mocked_data: mocked_data,
     mocked_data_2: mocked_data_2,
     mocked_data_3: mocked_data_3,
     mocked_data_4: mocked_data_4,
     mocked_data_5: mocked_data_5,
     mocked_data_6: mocked_data_6,
   };
    // Implement CSV parsing here
    const csvData: string[][] = [
      ["Apple", "Orange", "Banana"],
      ["Red", "Blue 2.0", "Green"],
      ["10000", "100001", "100002"],
      ["One", "Two", "Three"],
      ["Sun", "Moon", "March"],
      ["May", "Table", "Desk"],
      ["January", "February", "April"],
      ["Monday", "Tuesday", "Wednesday"],
      ["Happy", "Happy", "Happy"],
      ["0.9997", "8.4", "-0.9"],
    ];
    const headers: string[] = ["0", "1", "2"]; // Hardcoded for now, replace with CSV parsing logic

    const newDataset: Dataset = {
      name: filePath,
      data: csvData,
      headers: headers,
    };
    setLoadedDatasets([...loadedDatasets, newDataset]);
    setCurrentDatasetIndex(loadedDatasets.length);

    return `CSV file '${filePath}' loaded successfully.`;
  };

  const unloadCSV = () => {
    if (currentDatasetIndex !== null) {
      const updatedDatasets = [...loadedDatasets];
      updatedDatasets.splice(currentDatasetIndex, 1);
      setLoadedDatasets(updatedDatasets);
      setCurrentDatasetIndex(null);

      return "Dataset unloaded successfully.";
    }

    return "No dataset is currently loaded.";
  };

  const switchDataset = (index: number) => {
    if (index >= 0 && index < loadedDatasets.length) {
      setCurrentDatasetIndex(index);
      return `Switched to dataset '${loadedDatasets[index].name}'.`;
    }

    return "Invalid dataset index.";
  };

  const viewCSV = (props: Dataset) => {
    if (currentDatasetIndex !== null) {
      return (
        <table>
          <tbody>
            {props.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return "No dataset is currently loaded.";
  };


  return {
    loadedDatasets,
    currentDataset:
      currentDatasetIndex !== null ? loadedDatasets[currentDatasetIndex] : null,
    currentDatasetIndex,
    loadCSV,
    unloadCSV,
    switchDataset,
    viewCSV,
  };
}
