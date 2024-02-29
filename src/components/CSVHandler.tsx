import { useState } from "react";

export interface Dataset {
  name: string;
  data: string[][];
  headers: string[];
}

export interface CSVHandler {
  loadedDatasets: Dataset[];
  currentDataset: Dataset | null;
  currentDatasetIndex: number | null;
  loadCSV: (filePath: string) => string;
  unloadCSV: () => string;
  switchDataset: (index: number) => string;
  viewCSV: () => string;
}

export function useCSVHandler(): CSVHandler {
  const [loadedDatasets, setLoadedDatasets] = useState<Dataset[]>([]);
  const [currentDatasetIndex, setCurrentDatasetIndex] = useState<number | null>(
    null
  );

  const loadCSV = (filePath: string) => {
    // Implement CSV parsing here
    const csvData: string[][] = [
      ["John", "30"],
      ["Jane", "25"],
    ];
    const headers: string[] = ["Name", "Age"]; // Hardcoded for now, replace with CSV parsing logic

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

  const viewCSV = () => {
    if (currentDatasetIndex !== null) {
      const currentDataset = loadedDatasets[currentDatasetIndex];
      let tableHTML = `<h2>${currentDataset.name}</h2><table><thead><tr>`;

      currentDataset.headers.forEach((header) => {
        // Use headers from the dataset
        tableHTML += `<th>${header}</th>`;
      });

      tableHTML += "</tr></thead><tbody>";

      currentDataset.data.forEach((row) => {
        tableHTML += "<tr>";
        row.forEach((cell) => {
          tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += "</tr>";
      });

      tableHTML += "</tbody></table>";
      return tableHTML;
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
