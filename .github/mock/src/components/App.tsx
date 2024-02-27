import { useState } from 'react';
import '../styles/App.css';
import REPL from './REPL';

/**
 * This is the highest level component!
 * 
 * Real Estate Appraisal Command Prompt Application
 * 
 */


type Mode = 'brief' | 'verbose';


function App() {
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>('brief');

   /**
   * Handle command input.
   * @param command - The command entered by the user.
   */

  const handleCommand = (command: string) => {
    const output = `Command: ${command}`;
    addToHistory(output);
  };

  /**
   * Add output to command history.
   * @param output - The output to be added to the history.
   */

  const addToHistory = (output: string) => {
    setHistory(prevHistory => [...prevHistory, output]);
  };

   /**
   * Toggle between 'brief' and 'verbose' modes.
   */

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'brief' ? 'verbose' : 'brief'));
  };

  return (
    <div className="App">
      <h1>Real Estate Appraisal Command Prompt</h1>
      <div className="history">
        {history.map((output, index) => (
          <div key={index}>{mode === 'verbose' ? output : output.split(':')[1]}</div>
        ))}
      </div>
      <div className="input">
        <input type="text" placeholder="Enter command..." onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const command = e.currentTarget.value;
            handleCommand(command);
            e.currentTarget.value = '';
          }
        }} />
      </div>
      <div className="mode-toggle">
        <label>
          <input type="checkbox" checked={mode === 'verbose'} onChange={toggleMode} />
          Verbose Mode
        </label>
      </div>
    </div>
  );
}


export default App;