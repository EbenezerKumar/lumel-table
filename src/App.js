import logo from "./logo.svg";
import "./style.css";
import { useState } from "react"
import { tableDataStructure } from './data/tableData';
import LumelTable from './components/Table.jsx'

function App() {
  const [tableData, setTableData] = useState(tableDataStructure);

  return (
    <div className="App">
      <h1 style={{ marginTop: 0, padding: "20px", fontFamily: "fantasy"}}>Lumel Table</h1>
      <div style={{ margin: 20, padding: "20px" }}>
        <LumelTable tableData={tableData}/>
      </div>
    </div>
  );
}

export default App;
