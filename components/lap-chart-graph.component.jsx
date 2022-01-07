import React, { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Label,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { SelctionsContext } from "../pages/index";

const LapChartGraph = ({ sessionData }) => {
  const { setLap } = useContext(SelctionsContext);
  const [data, setData] = useState();
  const handleClick = (_, activeIndex) => {
    setLap(activeIndex.index + 1);
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
    if (sessionData) {
      const keys = Object.keys(sessionData.LapNumber);
      const temp = keys.map((key) => ({
        lapNumber: sessionData.LapNumber[key],
        lapTimeMilli: sessionData.LapTime[key],
        compound: sessionData.Compound[key],
      }));
      setData(temp);
    }
  }, [sessionData]);

  return (
    <div>
      <LineChart width={1000} height={400} data={data ? data : []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="lapNumber">
          <Label value="Time" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis
          tickFormatter={(lapTimeMilli) => msToTime(lapTimeMilli)}
          label={{
            value: "Time",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          label="hello"
          formatter={(value, _) => [msToTime(value), "Lap Time"]}
          labelFormatter={(value) => "Lap " + value}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="lapTimeMilli"
          stroke="#8884d8"
          activeDot={({ r: 8 }, { onClick: handleClick })}
        />
      </LineChart>
    </div>
  );
};

export default LapChartGraph;
