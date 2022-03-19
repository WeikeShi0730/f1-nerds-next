import { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Select from "react-select";
import { SelectionsContext } from "../pages/index";
import { server } from "../config";
const TelemetryGraph = dynamic(() => import("./telemetry-graph.component"), {
  ssr: false,
});
import Spinner from "./spinner.component";

const Telemetry = () => {
  const { setTelemetrySelections, telemetrySelections } =
    useContext(SelectionsContext);
  const [telemetryData, setTelemetryData] = useState([]);
  const [telemetryDataLoading, setTelemetryDataLoading] = useState(false);
  const [driverLap, setDriverLap] = useState([]);
  const condition =
    telemetrySelections !== undefined &&
    telemetrySelections !== null &&
    telemetrySelections.length > 0;

  useEffect(() => {
    let interval;
    let i = 0;
    let telemetryTempArray = [];

    if (condition && telemetrySelections.length > telemetryData.length) {
      const driverLap = telemetrySelections.map((e) => ({
        label: `${e.year.label} - ${e.gp.label} - ${e.session.label} - ${e.driver} - Lap ${e.lap}`,
        value: e,
      }));
      setDriverLap(driverLap);
      setTelemetryDataLoading(true);
      interval = setInterval(async () => {
        try {
          const { year, gp, session, driver, lap } = telemetrySelections[i];
          let message = await getData(
            year.value,
            gp.value,
            session.value,
            driver,
            lap
          );
          if (message === true) {
            i++;
            if (i === telemetrySelections.length) {
              setTelemetryData(telemetryTempArray);
              clearInterval(interval);
              setTelemetryDataLoading(false);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }, 1000);
    } else if (telemetrySelections.length < telemetryData.length) {
      const telemetrySelectionsIds = telemetrySelections.map(
        ({ year, gp, session, driver, lap }) =>
          `${year.value}-${gp.value}-${session.value}-${driver}-${lap}`
      );
      const updatedTelemetryData = telemetryData.reduce((acc, current) => {
        if (telemetrySelectionsIds.includes(current.id)) {
          acc.push(current);
        }
        return acc;
      }, []);
      setTelemetryData(updatedTelemetryData);
    }

    const getData = async (year, gp, session, driver, lap) => {
      try {
        const id = `${year}-${gp}-${session}-${driver}-${lap}`;
        const res = await fetch(
          `${server}/api/year/${year}/weekend/${gp}/session/${session}/driver/${driver}/lap/${lap}`
        );
        const json = await res.json();
        const telemetry = json;

        if (typeof telemetry === "object") {
          telemetryTempArray.push({ id, telemetry });
          return true;
        }
      } catch (error) {
        console.error(error);
      }
    };
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telemetrySelections]);

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
    const updated = driverLap
      .map(({ label, ...value }) => value)
      .map((e) => e.value);
    setTelemetrySelections(updated);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-8">
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
            className="w-min"
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
