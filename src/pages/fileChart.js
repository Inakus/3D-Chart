import { useEffect, useState } from "react";
import Papa from "papaparse";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function FileChart() {
  const [tableRows, setTableRows] = useState();
  const [values, setValues] = useState();

  const changeHandler = (event) => {
    if (!event) return;
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
    <main className="flex flex-col align-middle items-center justify-center min-h-screen">
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
        layout={{
          width: 600,
          height: 600,
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          showlegend: false,
        }}
        config={{ displayModeBar: false }}
      />
    </main>
  );
}
