import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  React.useEffect(() => {
    fetch("http://localhost:8000/data-domain-list")
      .then((v) => v.json())
      .then((v) => console.log(v));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
