import React, { useContext } from "react";
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
import { SelctionsContext } from "../pages/index";
import { colors } from "../config";

const TelemetryGraph = ({ telemetryData }) => {
  console.log(telemetryData);
  const { selectedDriverLap } = useContext(SelctionsContext);
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`bg-slate-500 bg-opacity-20 backdrop-blur-sm p-2 rounded-md shadow-lg`}
        >
          {payload.map((eachPayload, index) => {
            return (
              <div style={{ color: colors[index] }} key={index}>
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
              <Legend verticalAlign="top" height={36} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    name={selectedDriverLap[index]}
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="Speed"
                    stroke={colors[index]}
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
              <Legend verticalAlign="top" height={36} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    name={selectedDriverLap[index]}
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="RPM"
                    stroke={colors[index]}
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
                    name={selectedDriverLap[index]}
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="Throttle"
                    stroke={colors[index]}
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
                    name={selectedDriverLap[index]}
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="Brake"
                    stroke={colors[index]}
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
              <Legend verticalAlign="top" height={36} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    name={selectedDriverLap[index]}
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="nGear"
                    stroke={colors[index]}
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
              <Legend verticalAlign="top" height={36} />
              {telemetryData.map((eachTelemetryData, index) => {
                return (
                  <Line
                    name={selectedDriverLap[index]}
                    key={index}
                    connectNulls
                    data={eachTelemetryData}
                    dot={false}
                    type="monotone"
                    dataKey="DRS"
                    stroke={colors[index]}
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

TelemetryGraph.propTypes = {
  telemetryData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        Brake: PropTypes.number,
        DRS: PropTypes.number,
        RPM: PropTypes.number,
        Speed: PropTypes.number,
        Throttle: PropTypes.number,
        nGear: PropTypes.number,
      })
    )
  ),
};

export default TelemetryGraph;
