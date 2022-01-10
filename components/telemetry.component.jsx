import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { SelctionsContext } from "../pages/index";
import { server } from "../config";
const TelemetryGraph = dynamic(() => import("./telemetry-graph.component"), {
  ssr: false,
});
import Spinner from "./spinner.component";

const Telemetry = () => {
  const { year, gp, session, driver, lap } = useContext(SelctionsContext);
  const [telemetryData, setTelemetryData] = useState(null);
  const [telemetryDataLoading, setTelemetryDataLoading] = useState(false);

  const condition =
    year !== undefined &&
    year !== null &&
    gp !== undefined &&
    gp !== null &&
    session !== undefined &&
    session !== null &&
    driver !== undefined &&
    driver !== null &&
    lap !== undefined &&
    lap !== null;

  useEffect(() => {
    const interval = setInterval(() => {
      if (condition) {
        setTelemetryDataLoading(true);
        getData(year.value, gp.value, session.value, driver.value, lap);
      }
    }, 1000);
    const getData = async (year, gp, session, driver, lap) => {
      const res = await fetch(
        `${server}/api/year/${year}/weekend/${gp}/session/${session}/driver/${driver}/lap/${lap}`
      );
      const json = await res.json();
      const telemetry = json;
      if (typeof telemetry === "object") {
        setTelemetryData(telemetry);
        setTelemetryDataLoading(false);
        clearInterval(interval);
      }
      return telemetry;
    };
    return () => clearInterval(interval);
  }, [year, gp, session, driver, lap, condition]);

  return (
    <div className="flex flex-col justify-center items-center m-8">
      {telemetryDataLoading ? <Spinner /> : null}
      <div className="">
        {condition
          ? `${year.value} - ${gp.value} - ${session.value} - ${driver.value} - ${lap}`
          : "Select a lap to display telemetry data"}
      </div>
      {telemetryData ? (
        <div className="container bg-opacity-40 bg-white px-5 py-10 mx-auto my-10 rounded-3xl shadow-xl">
          <div className="flex flex-col justify-center items-center">
            <TelemetryGraph telemetryData={telemetryData} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Telemetry;
