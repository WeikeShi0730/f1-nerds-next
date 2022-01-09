import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Select from "react-select";
import { SelctionsContext } from "../pages/index";
const LapChartGraph = dynamic(() => import("./lap-chart-graph.component"), {
  ssr: false,
});
import { server, years } from "../config";

const LapChart = () => {
  const { year, gp, session, driver, setYear, setGp, setSession, setDriver } =
    useContext(SelctionsContext);

  //********* states for fetched data *********/
  const [round, setRound] = useState();
  const [gps, setGps] = useState();
  const [sessions, setSessions] = useState();
  const [drivers, setDrivers] = useState();
  const [sessionData, setSessionData] = useState();

  //********* api calls *********/
  useEffect(() => {
    const getData = async (year) => {
      const res = await fetch(`https://ergast.com/api/f1/${year}.json`);
      const json = await res.json();
      let gps = [];
      json.MRData.RaceTable.Races.forEach((race) => gps.push(race.raceName));
      setGps(gps);
    };

    if (year !== undefined && year !== null) {
      getData(year.value);
    }
  }, [year]);

  useEffect(() => {
    const getData = async (gp, year) => {
      const res = await fetch(`${server}/api/year/${year}/weekend/${gp}`);
      const json = await res.json();
      const round = json.round;
      const sessions = json.weekend_sessions;
      setRound(round);
      setSessions(sessions);
    };

    if (gp !== undefined && gp !== null) {
      getData(gp.value, year.value);
    }
  }, [gp, year]);

  useEffect(() => {
    const getData = async (round, year) => {
      const res = await fetch(
        `https://ergast.com/api/f1/${year}/${round}/drivers.json`
      );
      const json = await res.json();
      let drivers = [];
      json.MRData.DriverTable.Drivers.forEach((driver) => {
        drivers.push(driver.code);
      });
      setDrivers(drivers);
    };

    if (session !== undefined && session !== null) {
      getData(round, year.value);
    }
  }, [session, gp, round, year]);

  useEffect(() => {
    const getData = async (year, gp, session, driver) => {
      const res = await fetch(
        `${server}/api/year/${year}/weekend/${gp}/session/${session}/driver/${driver}`
      );

      const json = await res.json();
      const sessionData = json;
      setSessionData(sessionData);
    };

    if (driver !== undefined && driver !== null) {
      getData(year.value, gp.value, session.value, driver.value);
    }
  }, [session, gp, year, driver]);

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
    ? sessions.map((session) => {
        for (const [key, value] of Object.entries(session)) {
          return {
            value: key,
            label: value,
          };
        }
      })
    : [{ value: null, label: "select GP first..." }];

  const driverOptions = drivers
    ? drivers.map((driver) => ({
        value: driver,
        label: driver,
      }))
    : [{ value: null, label: "select session first..." }];

  return (
    <>
      <div className="flex m-8 justify-center space-x-5">
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
      <LapChartGraph sessionData={sessionData} />
    </>
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
