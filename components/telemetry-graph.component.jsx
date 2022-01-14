import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  YAxis,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const TelemetryGraph = ({ telemetryData }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-green-800 bg-slate-500 bg-opacity-20 backdrop-blur-sm p-2 rounded-md shadow-lg">
          <p>{`${payload[0].dataKey}: ${payload[0].value}`}</p>
          {payload[1] ? (
            <p className="text-amber-600">{`${payload[1].dataKey}: ${payload[1].value}`}</p>
          ) : null}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {telemetryData ? (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart data={telemetryData ? telemetryData : []}>
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                domain={["auto", "auto"]}
                label={{
                  value: "Speed (km/h)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                connectNulls
                dot={false}
                type="monotone"
                dataKey="Speed"
                stroke="#3f6212"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart
              width={1000}
              height={400}
              data={telemetryData ? telemetryData : []}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                domain={["auto", "auto"]}
                label={{ value: "RPM", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                connectNulls
                dot={false}
                type="monotone"
                dataKey="RPM"
                stroke="#3f6212"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart
              width={1000}
              height={400}
              data={telemetryData ? telemetryData : []}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                domain={["auto", "auto"]}
                label={{
                  value: "Throttle / Brake",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line
                connectNulls
                name="Throttle"
                dot={false}
                type="monotone"
                dataKey="Throttle"
                stroke="#3f6212"
                strokeWidth={2}
              />
              <Line
                connectNulls
                name="Brake"
                dot={false}
                type="monotone"
                dataKey="Brake"
                stroke="#d97706"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart
              width={1000}
              height={400}
              data={telemetryData ? telemetryData : []}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                label={{ value: "Gear", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                connectNulls
                dot={false}
                type="monotone"
                dataKey="nGear"
                stroke="#3f6212"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart
              width={1000}
              height={400}
              data={telemetryData ? telemetryData : []}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                label={{ value: "DRS", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                connectNulls
                dot={false}
                type="monotone"
                dataKey="DRS"
                stroke="#3f6212"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

TelemetryGraph.propTypes = {
  telemetryData: PropTypes.arrayOf(
    PropTypes.shape({
      Brake: PropTypes.number,
      DRS: PropTypes.number,
      RPM: PropTypes.number,
      Speed: PropTypes.number,
      Throttle: PropTypes.number,
      nGear: PropTypes.number,
    })
  ),
};

export default TelemetryGraph;
