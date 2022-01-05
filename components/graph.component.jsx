import React, { useState, useEffect, useContext } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { SelctionsContext } from "../pages/index";

const Graph = ({ sessionData }) => {
  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    return mins + ":" + secs + "." + ms;
  }

  const [data, setData] = useState();

  useEffect(() => {
    if (sessionData) {
      const keys = Object.keys(sessionData.LapNumber);
      const temp = keys.map((key) => ({
        lapNumber: sessionData.LapNumber[key],
        lapTimeMilli: sessionData.LapTime[key],
        lapTime: msToTime(sessionData.LapTime[key]),
        compound: sessionData.Compound[key],
      }));
      setData(temp);
    }
  }, [sessionData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">Lap: {`${label}`}</p>
          <p className="desc">Lap Time: {`${payload[0].payload.lapTime}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomYAxis = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">Lap: {`${label}`}</p>
          <p className="desc">Lap Time: {`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <LineChart width={1000} height={400} data={data ? data : []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="lapNumber" />
        <YAxis dataKey="lapTime" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          connectNulls
          type="monotone"
          dataKey="lapTimeMilli"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default Graph;
