import { useEffect, useState } from "react";
import Papa from "papaparse";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function App() {
  const [tableRows, setTableRows] = useState();

  const [values, setValues] = useState();

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setTableRows(rowsArray);
        setValues(valuesArray);
      },
    });
  };

  return (
    <div>
      <input
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
      />
      <Plot
        data={[
          {
            opacity: 0.8,
            type: "surface",
            z: values,
            x: tableRows,
          },
        ]}
        layout={{ width: 1000, height: 1000, title: "A Fancy Plot" }}
      />
    </div>
  );
}
