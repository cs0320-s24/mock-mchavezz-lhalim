import { useState } from "react";

export interface Dataset {
  name: string;
  data: string[][];
}

export function useCSVHandler() {
  const [currentDataset, setCurrentDataset] = useState<Dataset | null>(null);

  const loadCSV = (filePath: string) => {
    // You can implement CSV parsing logic here
    // Assume you parse the CSV into a 2D array called 'csvData'
    const csvData: string[][] = [
      ["Name", "Age"],
      ["John", "30"],
      ["Jane", "25"],
    ];
    setCurrentDataset({ name: filePath, data: csvData });
    
    return `CSV file '${filePath}' loaded successfully.`;
  };

  const unloadCSV = () => {
    setCurrentDataset(null);
    
    return "Dataset unloaded successfully.";
  };

  return { currentDataset, loadCSV, unloadCSV };
}
