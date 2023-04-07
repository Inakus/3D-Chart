import { useState } from "react";
import Papa from "papaparse";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d, index) => {
          if (index === 0) {
            rowsArray.push(Object.keys(d));
          }
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        rowsArray[0].map((e, index) => {
          if (index % 2 === 0) {
            setTableRows((prev) => {
              return [...prev, e];
            });
          }
        });
        // Filtered Values
        valuesArray.map((e) => {
          const temp = [];
          e.map((elemnt, index) => {
            if (index % 2 === 0) {
              temp.push(elemnt);
            }
          });
          setValues((prev) => {
            return [...prev, temp];
          });
        });
      },
    });
  };

  console.log(values);

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
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
