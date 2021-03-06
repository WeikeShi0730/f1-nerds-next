import { useState, useEffect, useContext } from "react";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import {
  LineChart,
  Label,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { SelectionsContext } from "../pages/index";
import { colors } from "../config";

const LapChartGraph = ({ sessionDataWithId }) => {
  const { year, gp, session, telemetrySelections, setTelemetrySelections } =
    useContext(SelectionsContext);
  const [graphData, setGraphData] = useState([]);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      if (window) {
        const height =
          window.innerWidth < 1536
            ? window.innerWidth < 1280
              ? window.innerWidth < 1024
                ? window.innerWidth < 768
                  ? 300
                  : 350
                : 400
              : 450
            : 500;
        setHeight(height);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  const handleClick = (_, activeIndex) => {
    const driver = activeIndex.payload.driver;
    const lap = activeIndex.payload.lapNumber;
    const newSelection = {
      year: year,
      gp: gp,
      session: session,
      driver: driver,
      lap: lap,
    };
    if (!telemetrySelections.some((e) => isEqual(e, newSelection))) {
      setTelemetrySelections((oldtelemetrySelections) => [
        ...oldtelemetrySelections,
        newSelection,
      ]);
    }
  };

  const msToTime = (s) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    return mins + ":" + secs + "." + ms;
  };

  useEffect(() => {
    let data;
    let tempArray = [];
    if (sessionDataWithId) {
      sessionDataWithId.forEach((eachData) => {
        const { sessionData, id } = eachData;
        const driver = id.split("-").slice(-1)[0];
        const keys = Object.keys(sessionData.LapNumber);
        data = keys.map((key) => ({
          driver: driver,
          lapNumber: sessionData.LapNumber[key],
          lapTimeMilli: sessionData.LapTime[key],
          compound: sessionData.Compound[key],
        }));
        tempArray.push(data);
      });
      setGraphData(tempArray);
    } else {
      setSelectedLap([]);
      setSelectedDriver([]);
    }
  }, [sessionDataWithId]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-500 bg-opacity-20 backdrop-blur-sm p-2 rounded-md shadow-lg">
          <p className="text-lg">{`Lap: ${label}`}</p>
          {payload.map((eachPayload, index) => {
            return (
              <div style={{ color: eachPayload.color }} key={index}>
                <p className="text-lg">{`${
                  eachPayload.payload.driver
                }: ${msToTime(eachPayload.payload.lapTimeMilli)} ${
                  eachPayload.payload.compound
                }`}</p>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart margin={{ top: 5, right: 5, bottom: 15, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDuplicatedCategory={false}
            dataKey="lapNumber"
            type="number"
            domain={["dataMin", "dataMax"]}
          >
            <Label value="Lap" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis
            width={80}
            tickFormatter={(lapTimeMilli) => msToTime(lapTimeMilli)}
            domain={["auto", "auto"]}
            label={{
              value: "Time",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          {graphData.map((eachGraphData, index) => {
            return (
              <Line
                name={eachGraphData[0].driver}
                key={index}
                connectNulls
                type="monotone"
                data={eachGraphData}
                dataKey="lapTimeMilli"
                stroke={colors[index]}
                activeDot={({ r: 8 }, { onClick: handleClick })}
                strokeWidth={2}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

LapChartGraph.propTypes = {
  sessionDataWithId: PropTypes.arrayOf(
    PropTypes.shape({
      LapNumber: PropTypes.objectOf(PropTypes.number),
      LapTime: PropTypes.objectOf(PropTypes.number),
      Compound: PropTypes.objectOf(PropTypes.string),
    })
  ),
};

export default LapChartGraph;
