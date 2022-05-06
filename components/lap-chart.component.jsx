/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Select from "react-select";
import SessionResult from "./session-result.component";
import { SelectionsContext } from "../pages/index";
const LapChartGraph = dynamic(() => import("./lap-chart-graph.component"), {
  ssr: false,
});
import { server, years } from "../config";
import Spinner from "./spinner.component";

const LapChart = () => {
  const {
    year,
    gp,
    session,
    selectedDrivers,
    setYear,
    setGp,
    setSession,
    setSelectedDrivers,
  } = useContext(SelectionsContext);

  //********* states for fetched data *********/
  const [round, setRound] = useState();
  const [gps, setGps] = useState();
  const [sessions, setSessions] = useState();
  const [drivers, setDrivers] = useState();
  const [sessionDataWithId, setSessionDataWithId] = useState([]);

  // const [sessionOptions, setSessionOptions] = useState();

  //********* states for loading *********/
  // one loading????????
  const [gpsLoading, setGpsLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [driversLoading, setDriversLoading] = useState(false);
  const [sessionDataLoading, setSessionDataLoading] = useState(false);

  //********* api calls *********/
  useEffect(() => {
    const getData = async (year) => {
      try {
        setGpsLoading(true);
        const res = await fetch(`https://ergast.com/api/f1/${year}.json`);
        const json = await res.json();
        let gps = [];
        json.MRData.RaceTable.Races.forEach((race) => gps.push(race.raceName));
        setGps(gps);
        setGpsLoading(false);
      } catch (error) {
        setGpsLoading(false);
        console.error(error);
      }
    };

    if (year !== undefined && year !== null) {
      // fetch new data //
      getData(year.value);
    }
  }, [year, setSelectedDrivers, setGp, setSession]);

  useEffect(() => {
    const getData = async (gp, year) => {
      try {
        setSessionsLoading(true);
        const res = await fetch(`${server}/api/year/${year}/weekend/${gp}`);
        const json = await res.json();
        const round = json.round;
        const sessions = json.weekend_sessions;
        setRound(round);
        setSessions(sessions);
        setSessionsLoading(false);
      } catch (error) {
        setSessionsLoading(false);
        console.error(error);
      }
    };

    if (gp !== undefined && gp !== null) {
      // fetch new data //
      getData(gp.value, year.value);
    }
  }, [gp, setSelectedDrivers, setSession]);

  useEffect(() => {
    const getData = async (round, year) => {
      try {
        setDriversLoading(true);
        const res = await fetch(
          `https://ergast.com/api/f1/${year}/${round}/drivers.json`
        );
        const json = await res.json();
        let drivers = [];
        json.MRData.DriverTable.Drivers.forEach((driver) => {
          drivers.push(driver.code);
        });
        setDrivers(drivers);
        setDriversLoading(false);
      } catch (error) {
        setDriversLoading(false);
        console.error(error);
      }
    };

    if (session !== undefined && session !== null) {
      // fetch new data //
      getData(round, year.value);
    }
  }, [session, setSelectedDrivers]);

  useEffect(() => {
    const getData = async (year, gp, session, selectedDrivers) => {
      try {
        setSessionDataLoading(true);
        const promises = selectedDrivers.map(async (eachDriver) => {
          const id = year + "-" + gp + "-" + session + "-" + eachDriver.value;
          const res = await fetch(
            `${server}/api/year/${year}/weekend/${gp}/session/${session}/driver/${eachDriver.value}`
          );
          const json = await res.json();
          const sessionData = json;
          return { id, sessionData };
        });
        const resolvedArray = await Promise.all(promises);
        setSessionDataWithId(resolvedArray);
        setSessionDataLoading(false);
      } catch (error) {
        setSessionDataLoading(false);
        console.error(error);
      }
    };

    if (selectedDrivers !== undefined && selectedDrivers !== null) {
      // fetch new data //
      getData(year.value, gp.value, session.value, selectedDrivers);
    }
  }, [selectedDrivers]);

  //********* options for different dropdown *********/
  const yearOptions = years
    ? years.map((year) => ({
        value: year,
        label: year.toString(),
      }))
    : [{ value: null, label: "Please wait..." }];

  const gpOptions = gps
    ? gps.map((gp) => ({
        value: gp,
        label: gp,
      }))
    : [{ value: null, label: "Select year first..." }];

  const sessionOptions = sessions
    ? sessions.map((session) => {
        for (const [key, value] of Object.entries(session)) {
          return {
            value: key,
            label: value,
          };
        }
      })
    : [{ value: null, label: "Select GP first..." }];

  const driverOptions = drivers
    ? drivers.map((driver) => ({
        value: driver,
        label: driver,
      }))
    : [{ value: null, label: "Select session first..." }];

  //********* custom styles for selection *********/
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(100, 116, 139, .2)",
      backdropFilter: "blur(4px)",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(100, 116, 139, 0)",
    }),
  };
  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      text: "black",
      primary50: "rgba(100, 116, 139, 0.1)",
      primary25: "rgba(100, 116, 139, 0.2)",
      primary: "rgba(100, 116, 139, 0.3)",
    },
  });

  return (
    <div className="flex flex-col justify-center items-center mx-8">
      <div>{sessionDataLoading ? <Spinner /> : null}</div>
      <div className="flex flex-col w-full lg:flex-row mx-8 my-10 justify-center items-center">
        <Select
          instanceId="year"
          value={year}
          onChange={(year) => {
            // clear other sections //
            setGp(null);
            setRound(null);
            setSession(null);
            setSelectedDrivers(null);
            setGps(null);
            setSessions(null);
            setDrivers(null);
            setSessionDataWithId([]);
            setYear(year);
          }}
          options={yearOptions}
          placeholder="Year..."
          className="mx-3 my-1 w-2/3 md:w-1/3 lg:w-24"
          styles={customStyles}
          theme={theme}
        />
        <Select
          instanceId="gp"
          value={gp}
          onChange={(gp) => {
            // clear other sections //
            setSession(null);
            setRound(null);
            setSelectedDrivers(null);
            setSessions(null);
            setDrivers(null);
            setSessionDataWithId([]);
            setGp(gp);
          }}
          options={gpOptions}
          isLoading={gpsLoading}
          placeholder="GP..."
          className="mx-3 my-1 w-2/3 md:w-1/3 lg:w-64"
          styles={customStyles}
          theme={theme}
        />
        <Select
          instanceId="session"
          value={session}
          onChange={(session) => {
            // clear other sections //
            setSelectedDrivers(null);
            setDrivers(null);
            setSessionDataWithId([]);
            setSession(session);
          }}
          options={sessionOptions}
          isLoading={sessionsLoading}
          placeholder="Session..."
          className="mx-3 my-1 w-2/3 md:w-1/3 lg:w-44"
          styles={customStyles}
          theme={theme}
        />
        <Select
          instanceId="driver"
          value={selectedDrivers}
          isMulti
          onChange={(selectedDrivers) => {
            setSelectedDrivers(selectedDrivers);
          }}
          options={driverOptions}
          isLoading={driversLoading}
          placeholder="Drivers..."
          className="mx-3 my-1 w-2/3 md:w-1/3 lg:w-64"
          styles={customStyles}
          theme={theme}
        />
      </div>
      <div className="container bg-opacity-40 backdrop-blur-sm bg-white rounded-3xl shadow-xl">
        <SessionResult gp={gp} year={year} session={session} />
      </div>
      <div className="container -z-10 bg-opacity-40 backdrop-blur-sm bg-white px-5 py-10 mx-auto my-5 rounded-3xl shadow-xl">
        <div className="flex flex-col justify-center items-center">
          <LapChartGraph sessionDataWithId={sessionDataWithId} />
        </div>
      </div>
    </div>
  );
};

export default LapChart;
