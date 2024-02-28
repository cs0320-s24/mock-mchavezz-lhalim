import React, { useState } from "react";
import "../styles/App.css";
import { useCSVHandler } from "<./CSVHandler";

type Mode = "brief" | "verbose";

function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("brief");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { currentDataset, loadCSV, unloadCSV } = useCSVHandler();

  const handleCommand = (command: string) => {
    const [action, ...args] = command.split(" ");
    switch (action) {
      case "login":
        handleLogin(args[0], args[1]);
        break;
      case "logout":
        handleLogout();
        break;
      case "load_file":
        if (loggedIn) {
          const filePath = args.join(" ");
          const loadResult = loadCSV(filePath);
          addToHistory(loadResult);
        } else {
          addToHistory("Error: Please log in to access this feature.");
        }
        break;
      case "unload_file":
        if (loggedIn) {
          const unloadResult = unloadCSV();
          addToHistory(unloadResult);
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
            <button onClick={() => handleLogin((document.getElementById("username") as HTMLInputElement).value, (document.getElementById("password") as HTMLInputElement).value)}>Login</button>
          </div>
        )}
      </div>
      {currentDataset && (
        <div className="dataset-info">
          <h2>Current Dataset: {currentDataset.name}</h2>
          <button onClick={unloadCSV}>Unload Dataset</button>
        </div>
      )}
    </div>
  );
}

export default App;
