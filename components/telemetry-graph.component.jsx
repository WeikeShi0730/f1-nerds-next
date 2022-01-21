import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  XAxis,
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
          {payload.map((eachPayload, index) => {
            return (
              <div key={index}>
                <p>{`${eachPayload.dataKey}: ${eachPayload.value}`}</p>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {telemetryData && telemetryData.length > 0 ? (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                allowDuplicatedCategory={false}
                type="number"
                domain={["dataMin", "dataMax"]}
                hide={true}
              />
              <YAxis
                domain={["auto", "auto"]}
                label={{
                  value: "Speed (km/h)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="Speed"
                    stroke="#3f6212"
                    strokeWidth={2}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                allowDuplicatedCategory={false}
                type="number"
                domain={["dataMin", "dataMax"]}
                hide={true}
              />
              <YAxis
                domain={["auto", "auto"]}
                label={{ value: "RPM", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="RPM"
                    stroke="#3f6212"
                    strokeWidth={2}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                allowDuplicatedCategory={false}
                type="number"
                domain={["dataMin", "dataMax"]}
                hide={true}
              />
              <YAxis
                domain={["auto", "auto"]}
                label={{
                  value: "Throttle",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="Throttle"
                    stroke="#3f6212"
                    strokeWidth={2}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                allowDuplicatedCategory={false}
                type="number"
                domain={["dataMin", "dataMax"]}
                hide={true}
              />
              <YAxis
                domain={["auto", "auto"]}
                label={{
                  value: "Brake",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="Brake"
                    stroke="#3f6212"
                    strokeWidth={2}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                allowDuplicatedCategory={false}
                type="number"
                domain={["dataMin", "dataMax"]}
                hide={true}
              />
              <YAxis
                label={{ value: "Gear", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="nGear"
                    stroke="#3f6212"
                    strokeWidth={2}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                allowDuplicatedCategory={false}
                type="number"
                domain={["dataMin", "dataMax"]}
                hide={true}
              />
              <YAxis
                label={{ value: "DRS", angle: -90, position: "insideLeft" }}
              />
              <Tooltip content={<CustomTooltip />} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="DRS"
                    stroke="#3f6212"
                    strokeWidth={2}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

// TelemetryGraph.propTypes = {
//   telemetryData: PropTypes.arrayOf(
//     PropTypes.shape({
//       Brake: PropTypes.number,
//       DRS: PropTypes.number,
//       RPM: PropTypes.number,
//       Speed: PropTypes.number,
//       Throttle: PropTypes.number,
//       nGear: PropTypes.number,
//     })
//   ),
// };

export default TelemetryGraph;
