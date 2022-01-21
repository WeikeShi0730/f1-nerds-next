import React, { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Select from "react-select";
import { SelctionsContext } from "../pages/index";
import { server } from "../config";
const TelemetryGraph = dynamic(() => import("./telemetry-graph.component"), {
  ssr: false,
});
import Spinner from "./spinner.component";

const Telemetry = () => {
  const { year, gp, session, selectedDriverLap, setSelectedDriverLap } =
    useContext(SelctionsContext);
  const [telemetryData, setTelemetryData] = useState([]);
  const [telemetryDataLoading, setTelemetryDataLoading] = useState(false);
  const [driverLap, setDriverLap] = useState([]);
  const condition =
    year !== undefined &&
    year !== null &&
    gp !== undefined &&
    gp !== null &&
    session !== undefined &&
    session !== null &&
    selectedDriverLap !== undefined &&
    selectedDriverLap !== null &&
    selectedDriverLap.length > 0;

  useEffect(() => {
    let interval;
    let i = 0;
    let telemetryTempArray = [];

    if (condition) {
      const driverLap = selectedDriverLap.map((e) => ({
        label: `${session.value} - ${e.split("-")[0]} - Lap ${e.split("-")[1]}`,
        value: e,
      }));
      setDriverLap(driverLap);
      setTelemetryDataLoading(true);
      interval = setInterval(async () => {
        let message = await getData(
          year.value,
          gp.value,
          session.value,
          selectedDriverLap[i]
        );
        if (message === true) {
          i++;
          if (i === selectedDriverLap.length) {
            setTelemetryData(telemetryTempArray);
            clearInterval(interval);
            setTelemetryDataLoading(false);
          }
        }
      }, 1000);
    } else {
      setTelemetryData([]);
    }
    const getData = async (year, gp, session, selectedDriverLap) => {
      let driver = selectedDriverLap.split("-")[0];
      let lap = selectedDriverLap.split("-")[1];
      const res = await fetch(
        `${server}/api/year/${year}/weekend/${gp}/session/${session}/driver/${driver}/lap/${lap}`
      );
      const json = await res.json();
      const telemetry = json;

      if (typeof telemetry === "object") {
        telemetryTempArray.push(telemetry);
        return true;
      }
    };
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, gp, session, selectedDriverLap, condition]);

  //********* custom styles for selection *********/
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(100, 116, 139, .1)",
      backdropFilter: "blur(3px)",
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

  const handleOnChange = (driverLap) => {
    setDriverLap(driverLap);
    setTelemetryData([]);
    const updated = driverLap
      .map(({ label, ...value }) => value)
      .map((e) => e.value);
    setSelectedDriverLap(updated);
  };

  return (
    <div className="flex flex-col justify-center items-center m-8">
      {telemetryDataLoading ? <Spinner /> : null}
      <div className="text-xl p-1 mt-10 text-center">
        {condition ? (
          <Select
            isMulti
            instanceId="driverLap"
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            noOptionsMessage={() => null}
            isClearable={false}
            value={driverLap}
            onChange={handleOnChange}
            className="w-screen px-10"
            styles={customStyles}
            theme={theme}
          />
        ) : (
          "Select a lap to display telemetry data"
        )}
      </div>

      {telemetryData && telemetryData.length > 0 ? (
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
