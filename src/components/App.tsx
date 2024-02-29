import React, { useState } from "react";
import "../styles/App.css";
import { useCSVHandler, Dataset } from "../components/CSVHandler"; // Import Dataset type

type Mode = "brief" | "verbose";

function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("brief");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { currentDataset, loadCSV, unloadCSV, viewCSV } = useCSVHandler(); // Import the CSV handling functions

  const handleCommand = (command: string) => {
    const [action, ...args] = command.split(" ");
    switch (action) {
      case "login":
        handleLogin(args[0], args[1]);
        break;
      case "logout":
        handleLogout();
        break;
      case "load_csv":
        if (loggedIn) {
          const filePath = args.join(" ");
          const loadResult = loadCSV(filePath);
          addToHistory(loadResult);
        } else {
          addToHistory("Error: Please log in to access this feature.");
        }
        break;
      case "unload_csv":
        if (loggedIn) {
          const unloadResult = unloadCSV();
          addToHistory(unloadResult);
        } else {
          addToHistory("Error: Please log in to access this feature.");
        }
        break;
      case "view":
        if (loggedIn) {
          const viewResult = viewCSV();
          console.log("View Result:", viewResult); // Log the view result
          if (viewResult && viewResult !== "No dataset is currently loaded.") {
            addToHistory(viewResult);
          } else {
            addToHistory("Error: No dataset loaded or dataset is empty.");
          }
        } else {
          addToHistory("Error: Please log in to access this feature.");
        }
        break;
      default:
        addToHistory(`Invalid command: ${command}`);
    }
  };

  const handleLogin = (username: string, password: string) => {
    // Perform login authentication here
    // For simplicity, let's assume any non-empty username/password is valid
    if (username && password) {
      setLoggedIn(true);
      addToHistory("Login successful.");
    } else {
      addToHistory("Error: Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    addToHistory("Logged out.");
  };

  const addToHistory = (output: string) => {
    setHistory((prevHistory) => [...prevHistory, output]);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "brief" ? "verbose" : "brief"));
  };

  const renderHTMLTable = () => {
  if (!currentDataset || !currentDataset.data || !currentDataset.headers) {
    return <div>No dataset loaded</div>;
  }

  const tableHTML = `
    <div>
      <h2>${currentDataset.name}</h2>
      <table className="csv-table">
        <thead>
          <tr>
            ${currentDataset.headers.map((header, index) => `<th>${header}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${currentDataset.data.map((row) => `
            <tr>
              ${row.map((cell) => `<td>${cell}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  return <div dangerouslySetInnerHTML={{ __html: tableHTML }} />;
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
      <div className="login">
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div>
            <input type="text" placeholder="Username" id="username" />
            <input type="password" placeholder="Password" id="password" />
            <button
              onClick={() =>
                handleLogin(
                  (document.getElementById("username") as HTMLInputElement)
                    .value,
                  (document.getElementById("password") as HTMLInputElement)
                    .value
                )
              }
            >
              Login
            </button>
          </div>
        )}
      </div>
      {currentDataset && (
        <div className="dataset-info">
          <h2>Current Dataset: {currentDataset.name}</h2>
          <button onClick={unloadCSV}>Unload Dataset</button>
        </div>
      )}
      {loggedIn && currentDataset && history.includes("view") && (
        <div className="csv-viewer">
          <h2>CSV Viewer</h2>
          {renderHTMLTable()}
        </div>
      )}
    </div>
  );
}

export default App;
