import "./App.css";
import Panel from "./components/Panel";
import Result from "./components/Result";
import { useState } from "react";

function App() {
  const [inputArray, setInputArray] = useState([]);
  const [row, setRow] = useState();

  return (
    <div className="app">
      <div className="container">
        <Panel inputArray={inputArray} setRow={setRow} setInputArray={setInputArray} />
        <Result inputArray={inputArray} row={row} />
      </div>
    </div>
  );
}

export default App;
