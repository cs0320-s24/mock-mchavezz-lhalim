import React, { useState } from "react";
import "../styles/App.css";
import { useCSVHandler, Dataset } from "../components/REPLFunction";

type Mode = "brief" | "verbose";

function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("brief");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { currentDataset, loadCSV, unloadCSV, viewCSV } = useCSVHandler();

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
        if (loggedIn && currentDataset != null) {
          const viewResult = viewCSV(currentDataset);
          console.log("View Result:", viewResult);
          if (viewResult && viewResult !== "No dataset is currently loaded.") {
            addToHistory("CSV displayed");
          } else {
            addToHistory("Error: No dataset loaded or dataset is empty.");
          }
        } else {
          addToHistory("Error: Please log in to access this feature.");
        }
        break;
      case "search":
        if (args.length < 2) {
          addToHistory(
            "Incorrect search parameters. Please input 'search <column> <value>'."
          );
        } else if (loggedIn && currentDataset != null) {
          const col = parseInt(args[0]);
          const query = args[1];
          for (let i = 0; i < currentDataset.data.length; i++) {
            if (currentDataset.data[i][col] == query) {
              const found = currentDataset.data[i].toString();
              addToHistory(found);
            }
          }
          addToHistory("Search completed.");
        } else if (currentDataset == null) {
          addToHistory("Error: No dataset loaded or dataset is empty.");
        } else if (!loggedIn) {
          addToHistory("Error: Please log in to access this feature.");
        }
        break;
      default:
        addToHistory(`Invalid command: ${command}`);
    }
  };

  const handleLogin = (username: string, password: string) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (username && password && password.match(passwordRegex)) {
      setLoggedIn(true);
      addToHistory("Login successful.");
    } else {
      addToHistory(
        "Error: Invalid username or password. Password must be at least 8 characters long and include one number and one special character."
      );
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
      <div className="top-section">
        <div className="logo">&</div>{" "}
        <div className="contact-info">
          <p>Phone: 401-777-8888</p>
          <p>Address: 69 Brown Street, Providence, RI, USA 02912</p>
        </div>
      </div>
      <h1>Real Estate Appraisal Command Prompt</h1>
      <div className="history">
        {history.map((output, index) => (
          <div key={index}>
            {mode === "verbose" ? output : output.split(":")[1]}
          </div>
        ))}
      </div>
      {loggedIn && (
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
      )}
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
      {currentDataset && history.includes("CSV displayed") && (
        <div className="csv-viewer">
          <h2>CSV Viewer</h2>
          {viewCSV(currentDataset)}
        </div>
      )}
      <div className="bottom-section">
        <div className="about-us">
          <h2>About Us</h2>
          <p>
            As a real estate appraiser, I am responsible for assessing the
            market value of a property. I am licensed to appraise one- to
            four-family homes. I work on behalf of my appraisal firm and am
            unconnected to the local homeowners, lawyers, and larger banks that
            hire me. While much of my time is spent on-site evaluating the
            property itself, part of my job is also to consider similar
            properties in the neighborhood and surrounding area, because they
            influence the value of the property I am assessing.
          </p>
        </div>
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            Email:{" "}
            <a href="mailto:your-email@example.com">contact_us@brown.edu</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+1 (401) 777-8888</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
