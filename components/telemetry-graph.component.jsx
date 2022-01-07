import React, { useEffect } from "react";
import {
  LineChart,
  YAxis,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const TelemetryGraph = ({ telemetryData }) => {
  return (
    <>
      {telemetryData ? (
        <div>
          <LineChart
            width={1000}
            height={400}
            data={telemetryData ? telemetryData : []}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              label={{
                value: "Speed (km/h)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Line
              connectNulls
              dot={false}
              type="monotone"
              dataKey="Speed"
              stroke="#8884d8"
            />
          </LineChart>
          <LineChart
            width={1000}
            height={400}
            data={telemetryData ? telemetryData : []}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              label={{ value: "RPM", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line
              connectNulls
              dot={false}
              type="monotone"
              dataKey="RPM"
              stroke="#8884d8"
            />
          </LineChart>
          <LineChart
            width={1000}
            height={400}
            data={telemetryData ? telemetryData : []}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              label={{
                value: "Throttle / Brake",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              connectNulls
              name="Throttle"
              dot={false}
              type="monotone"
              dataKey="Throttle"
              stroke="#8884d8"
            />
            <Line
              connectNulls
              name="Brake"
              dot={false}
              type="monotone"
              dataKey="Brake"
              stroke="#82ca9d"
            />
          </LineChart>
          <LineChart
            width={1000}
            height={400}
            data={telemetryData ? telemetryData : []}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              label={{ value: "Gear", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line
              connectNulls
              dot={false}
              type="monotone"
              dataKey="nGear"
              stroke="#8884d8"
            />
          </LineChart>
          <LineChart
            width={1000}
            height={400}
            data={telemetryData ? telemetryData : []}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              label={{ value: "DRS", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line
              connectNulls
              dot={false}
              type="monotone"
              dataKey="DRS"
              stroke="#8884d8"
            />
          </LineChart>{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TelemetryGraph;
