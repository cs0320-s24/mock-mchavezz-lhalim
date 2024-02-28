import { useState } from "react";
import "../styles/App.css";
import REPL from "./REPL";

type Mode = "brief" | "verbose";

interface Dataset {
  name: string;
  data: string[][];
}

function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("brief");
  const [currentDataset, setCurrentDataset] = useState<Dataset | null>(null);

  const handleCommand = (command: string) => {
    const [action, ...args] = command.split(" ");
    switch (action) {
      case "load_file":
        const filePath = args.join(" ");
        loadCSV(filePath);
        break;
      default:
        addToHistory(`Invalid command: ${command}`);
    }
  };

  const loadCSV = (filePath: string) => {
    // You can implement CSV parsing logic here
    // Assume you parse the CSV into a 2D array called 'csvData'
    const csvData: string[][] = [
      ["Name", "Age"],
      ["John", "30"],
      ["Jane", "25"],
    ];
    setCurrentDataset({ name: filePath, data: csvData });
    addToHistory(`CSV file '${filePath}' loaded successfully.`);
  };

  const addToHistory = (output: string) => {
    setHistory((prevHistory) => [...prevHistory, output]);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "brief" ? "verbose" : "brief"));
  };

  return (
    <div className="App">
      <h1>Real Estate Appraisal Command Prompt</h1>
      <div className="history">
        {history.map((output, index) => (
          <div key={index}>
            {mode === "verbose" ? output : output.split(":")[1]}
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Enter command..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const command = e.currentTarget.value;
              handleCommand(command);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="mode-toggle">
        <label>
          <input
            type="checkbox"
            checked={mode === "verbose"}
            onChange={toggleMode}
          />
          Verbose Mode
        </label>
      </div>
      {currentDataset && (
        <div className="dataset-info">
          <h2>Current Dataset: {currentDataset.name}</h2>
          <button onClick={() => setCurrentDataset(null)}>
            Unload Dataset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
