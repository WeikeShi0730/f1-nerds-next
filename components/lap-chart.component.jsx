import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";

import { SelctionsContext } from "../pages/index";

const LapChart = () => {
  const {
    year,
    years,
    setYear,
    gp,
    gps,
    setGp,
    session,
    sessions,
    setSession,
    driver,
    drivers,
    setDriver,
  } = useContext(SelctionsContext);

  //********* options for different dropdown *********/
  const yearOptions = years
    ? years.map((year) => ({
        value: year,
        label: year.toString(),
      }))
    : [{ value: null, label: "please wait..." }];

  const gpOptions = gps
    ? gps.map((gp) => ({
        value: gp,
        label: gp,
      }))
    : [{ value: null, label: "select year first..." }];

  const sessionOptions = sessions
    ? sessions.map((session) => ({
        value: session,
        label: session,
      }))
    : [{ value: null, label: "select GP first..." }];

  const driverOptions = drivers
    ? drivers.map((driver) => ({
        value: driver,
        label: driver,
      }))
    : [{ value: null, label: "select session first..." }];

  return (
    <div>
      <Select
        instanceId="year"
        value={year}
        onChange={(year) => {
          setYear(year);
        }}
        options={yearOptions}
        placeholder="year..."
      />
      <Select
        instanceId="gp"
        value={gp}
        onChange={(gp) => {
          setGp(gp);
        }}
        options={gpOptions}
        placeholder="gp..."
      />
      <Select
        instanceId="session"
        value={session}
        onChange={(session) => {
          setSession(session);
        }}
        options={sessionOptions}
        placeholder="Session..."
      />
      <Select
        instanceId="driver"
        value={driver}
        onChange={(driver) => {
          setDriver(driver);
        }}
        options={driverOptions}
        placeholder="Drivers..."
      />
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
