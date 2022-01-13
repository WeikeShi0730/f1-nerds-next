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
    let data;
    if (sessionData) {
      const keys = Object.keys(sessionData.LapNumber);
      data = keys.map((key) => ({
        lapNumber: sessionData.LapNumber[key],
        lapTimeMilli: sessionData.LapTime[key],
        compound: sessionData.Compound[key],
      }));
    } else {
      setLap(null);
      data = null;
    }
    setData(data);
  }, [sessionData, setLap]);

  data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-green-800 bg-slate-500 bg-opacity-20 backdrop-blur-sm p-2 rounded-md shadow-lg">
          <p className="text-lg">{`Lap : ${label}`}</p>
          <p>{`Lap Time: ${msToTime(payload[0].payload.lapTimeMilli)}`}</p>
          <p>{`Compound: ${payload[0].payload.compound}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart width={1000} height={400} data={data ? data : []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="lapNumber">
            <Label value="Lap" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis
            tickFormatter={(lapTimeMilli) => msToTime(lapTimeMilli)}
            label={{
              value: "Time",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            connectNulls
            type="monotone"
            dataKey="lapTimeMilli"
            stroke="#3f6212"
            activeDot={({ r: 8 }, { onClick: handleClick })}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

LapChartGraph.propTypes = {
  sessionData: PropTypes.shape({
    LapNumber: PropTypes.objectOf(PropTypes.number),
    LapTime: PropTypes.objectOf(PropTypes.number),
    Compound: PropTypes.objectOf(PropTypes.string),
  }),
};

export default LapChartGraph;
