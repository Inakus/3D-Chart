import { useEffect, useState } from "react";
import Papa from "papaparse";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

function App() {
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
      },
    });
  };

  const randoNumberGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  useEffect(() => {
    const x = [];
    const z = [];
    for (let i = 0; i < 40; i++) {
      x.push(i + 1);
      const z_row = [];
      for (let j = 0; j < 40; j++) {
        z_row.push(randoNumberGenerator(-10, 10));
      }
      z.push(z_row);
    }
    setTableRows(x);
    setValues(z);
  }, []);

  console.log(values);
  console.log(tableRows);

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
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

export default App;
