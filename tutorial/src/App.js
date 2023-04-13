import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function App() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  const defaultColDef = useMemo(() => ({ sortable: true, filter: true }), []);

  const cellClickedListener = useCallback((e) => {
    console.log(e);
  }, []);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const pushMeClicked = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <button onClick={pushMeClicked}>Push Me</button>
      <AgGridReact
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="multiple"
        animateRows={true}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default App;
