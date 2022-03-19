const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://127.0.0.1:5000"
  : "https://f1-nerds-flask.herokuapp.com/";

export const years = [2018, 2019, 2020, 2021, 2022];

export const colors = [
  "#0f172a",
  "#b91c1c",
  "#166534",
  "#06b6d4",
  "#0369a1",
  "#1e40af",
  "#f87171",
  "#713f12",
  "#a3e635",
  "#fb923c",
  "#5b21b6",
];
