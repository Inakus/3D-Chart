import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function RandomChart() {
  const [tableRows, setTableRows] = useState();
  const [values, setValues] = useState();

  const [minValue, setMinValue] = useState(-10);
  const [maxValue, setMaxValue] = useState(10);

  const [changeValue, setChangeValue] = useState(false);

  const randoNumberGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const setMax = (event) => {
    setMaxValue(event.target.value);
  };
  const setMin = (event) => {
    setMinValue(event.target.value);
  };

  const handleClick = () => {
    setChangeValue(!changeValue);
  };

  useEffect(() => {
    const x = [];
    const z = [];
    for (let i = 0; i < 40; i++) {
      x.push(i + 1);
      const z_row = [];
      for (let j = 0; j < 40; j++) {
        z_row.push(randoNumberGenerator(minValue, maxValue));
      }
      z.push(z_row);
    }
    setTableRows(x);
    setValues(z);
  }, [changeValue]);

  return (
    <main className="min-h-screen flex flex-col justify-center align-middle items-center">
      <div className="flex gap-6 mb-5">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Minimal Value</span>
          </label>
          <input
            onChange={setMin}
            type="number"
            placeholder="Minimal Value"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Maximum Value</span>
          </label>
          <input
            onChange={setMax}
            type="number"
            placeholder="Maxium Value"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <button onClick={handleClick} className="btn mb-5">
        Generate
      </button>
      <Plot
        data={[
          {
            opacity: 0.8,
            type: "surface",
            z: values,
            x: tableRows,
          },
        ]}
        layout={{ width: 1000, height: 1000 }}
      />
    </main>
  );
}
