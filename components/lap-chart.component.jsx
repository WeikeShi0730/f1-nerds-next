import React, { useState } from "react";
import Select from "react-select";

import { years } from "../config";

const options = years.map((year) => ({
  value: year,
  label: year.toString(),
}));

const LapChart = ({ gp, session, drivers }) => {
  const [year, setYear] = useState(2018);
  const handleChange = (year) => {
    setYear(year);
  };
  return (
    <div>
      <Select
        instanceId={year}
        value={year}
        onChange={handleChange}
        options={options}
        placeholder="year..."
      />
      {/* <Select
        instanceId={gp}
        value={gp}
        onChange={handleChange}
        options={options}
        placeholder="gp..."
      />
      <Select
        instanceId={Session}
        value={Session}
        onChange={handleChange}
        options={options}
        placeholder="Session..."
      />
      <Select
        instanceId={Drivers}
        value={Drivers}
        onChange={handleChange}
        options={options}
        placeholder="Drivers..."
      /> */}
    </div>
  );
};

export default LapChart;
// export const getStaticPaths = async () => {
//   const paths = years.map((year) => ({ params: { year: year.toString() } }));
//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context) => {
//   const res = await fetch(`http://ergast.com/api/f1/2020.json`);
//   console.log(res);
//   const circuits = await res.json();
//   return {
//     props: {
//       circuits,
//     },
//   };
// };
