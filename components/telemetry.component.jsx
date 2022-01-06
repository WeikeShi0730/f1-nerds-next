import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { SelctionsContext } from "../pages/index";
import { server } from "../config";
const TelemetryGraph = dynamic(() => import("./telemetry-graph.component"), {
  ssr: false,
});

const Telemetry = () => {
  const { year, gp, session, driver, lap } = useContext(SelctionsContext);
  const [telemetryData, setTelemetryData] = useState(null);

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
        clearInterval(interval);
      }
      return telemetry;
    };
    return () => clearInterval(interval);
  }, [year, gp, session, driver, lap, condition]);

  return (
    <div>
      <TelemetryGraph telemetryData={telemetryData} />
    </div>
  );
};

export default Telemetry;
