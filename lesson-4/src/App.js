import React, {
  Component,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

// cell renderer simple component
const SimpleComps = (p) => {
  console.log("SimpleComps", p);
  const onDollar = useCallback(() => window.alert("Dollar" + p.value));
  const onAt = useCallback(() => window.alert("Euro" + p.value));

  return (
    <div>
      {/* <button onClick={onDollar}>$</button> */}
      <button onClick={onAt}>Push</button>
      {p.value}
    </div>
  );
};

const PushComp = (p) => {
  console.log("SimpleComps", p);
  const onDollar = useCallback(() => window.alert("Dollar" + p.value));
  const onAt = useCallback(() => window.alert("Euro" + p.value));

  return (
    <div>
      {/* <button onClick={onDollar}>$</button> */}
      <button onClick={onAt}>Push</button>
      {p.value}
    </div>
  );
};

class PullComp extends Component {
  render() {
    return (
      <div>
        <button onClick={() => window.alert("Pull")}>Pull</button>
        {this.props.value}
      </div>
    );
  }
}

function App() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", cellRenderer: PushComp },
    {
      field: "age",
      cellRenderer: (p) => (
        <>
          <b>Age is:</b>
          {p.value}
        </>
      ),
    },
    { field: "country", cellRenderer: PullComp },
    {
      field: "year",
      cellRendererSelector: (p) => {
        if (p.data.year == 2000) {
          return { component: PushComp };
        }
        if (p.data.year == 2004) {
          return { component: PullComp };
        }
      },
    },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);

  const defaultColDef = useMemo(
    () => ({ sortable: true, filter: true, enableRowGroup: true }),
    []
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AgGridReact
        ref={gridRef}
        rowGroupPanelShow="always"
        rowData={rowData}
        animateRows={true}
        enableRangeSelection={true}
        enableCharts={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default App;
