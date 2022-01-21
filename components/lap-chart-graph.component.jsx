import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Label,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { SelctionsContext } from "../pages/index";
import { colors } from "../config";

const LapChartGraph = ({ sessionDataWithId }) => {
  const { setSelectedDriverLap, selectedDriverLap } =
    useContext(SelctionsContext);
  const [graphData, setGraphData] = useState([]);

  const handleClick = (_, activeIndex) => {
    const id = activeIndex.payload.driver + "-" + activeIndex.payload.lapNumber;
    if (!selectedDriverLap.some((e) => e === id)) {
      setSelectedDriverLap((selectedDriverLap) => [
        ...selectedDriverLap,
        activeIndex.payload.driver + "-" + activeIndex.payload.lapNumber,
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
          <p className="text-lg">{`Lap : ${label}`}</p>
          {payload.map((eachPayload, index) => {
            return (
              <div style={{ color: colors[index] }} key={index}>
                <p className="text-lg">{`${eachPayload.payload.driver}`}</p>
                {/* for each payload */}
                <p>{`Lap Time: ${msToTime(
                  eachPayload.payload.lapTimeMilli
                )}`}</p>
                <p>{`Compound: ${eachPayload.payload.compound}`}</p>
              </div>
            ); //[${colors[index]}]
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={graphData}>
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
            tickFormatter={(lapTimeMilli) => msToTime(lapTimeMilli)}
            domain={["auto", "auto"]}
            label={{
              value: "Time",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          {graphData.map((eachGraphData, index) => {
            return (
              <Line
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
