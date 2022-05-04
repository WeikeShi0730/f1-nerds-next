import React, { useState, useEffect } from "react";
import { server } from "../config";

const SessionResult = ({ gp, year, session }) => {
  const [sessionResult, setSessionResult] = useState(null);
  useEffect(() => {
    let sessionResult = null;
    const getData = async (gp, year, session) => {
      try {
        const res = await fetch(
          `${server}/api/year/${year}/weekend/${gp}/session/${session}`
        );
        sessionResult = await res.json();
        // setSessionsLoading(false);
        setSessionResult(sessionResult);
      } catch (error) {
        sessionResult = null;
        console.error(error);
      }
    };

    if (
      year !== undefined &&
      year !== null &&
      gp !== undefined &&
      gp !== null &&
      session !== undefined &&
      session !== null
    ) {
      getData(gp.value, year.value, session.value);
    } else {
      sessionResult = null;
    }
    setSessionResult(sessionResult);
  }, [gp, session, year]);
  return (
    <>
      {sessionResult ? (
        <div>
          <h1>sessionResult</h1>
          {sessionResult.map((eachResult, index) => {
            return <div key={index}>{eachResult.Driver.code}</div>;
          })}
        </div>
      ) : null}
    </>
  );
};

export default SessionResult;

// {
//     "Constructor": {
//       "constructorId": "red_bull",
//       "name": "Red Bull",
//       "nationality": "Austrian",
//       "url": "http://en.wikipedia.org/wiki/Red_Bull_Racing"
//     },
//     "Driver": {
//       "code": "VER",
//       "dateOfBirth": "1997-09-30",
//       "driverId": "max_verstappen",
//       "familyName": "Verstappen",
//       "givenName": "Max",
//       "nationality": "Dutch",
//       "permanentNumber": "33",
//       "url": "http://en.wikipedia.org/wiki/Max_Verstappen"
//     },
//     "FastestLap": {
//       "AverageSpeed": {
//         "speed": "220.800",
//         "units": "kph"
//       },
//       "Time": {
//         "time": "1:26.103"
//       },
//       "lap": "39",
//       "rank": "1"
//     },
//     "Time": {
//       "millis": "5417345",
//       "time": "1:30:17.345"
//     },
//     "grid": "1",
//     "laps": "58",
//     "number": "33",
//     "points": "26",
//     "position": "1",
//     "positionText": "1",
//     "status": "Finished"
//   },
