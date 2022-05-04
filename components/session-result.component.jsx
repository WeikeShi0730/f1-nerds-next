import React, { useState, useEffect } from "react";
import { server } from "../config";

const SessionResult = ({ gp, year, session }) => {
  const [sessionResult, setSessionResult] = useState(null);
  useEffect(() => {
    const getData = async (gp, year, session) => {
      try {
        if (
          year !== undefined &&
          gp !== undefined &&
          session !== undefined &&
          year !== null &&
          gp !== null &&
          session !== null
        ) {
          const res = await fetch(
            `${server}/api/year/${year.value}/weekend/${gp.value}/session/${session.value}`
          );
          const sessionResult = await res.json();
          setSessionResult(sessionResult);
        } else {
          setSessionResult(null);
        }
        // setSessionsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // setSessionResult(null);
    getData(gp, year, session);
  }, [gp, session, year]);
  return (
    <>
      {sessionResult ? (
        <div className="w-full h-full bg-opacity-40 bg-white px-5 py-10 mx-auto mb-5 rounded-3xl shadow-xl">
          <div className="flex justify-center">Session Result</div>
          <div className="grid grid-cols-8 justify-items-center gap-y-10">
            <div>Driver</div>
            <div>Fastest Lap Time</div>
            <div>Fastest Lap</div>
            <div>Fastest Lap Rank</div>
            <div>Grid</div>
            <div>Position</div>
            <div>Points</div>
            <div>Status</div>
          </div>
          {sessionResult.map((eachResult, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-8 justify-items-center"
              >
                <div>{eachResult.Driver.code} </div>
                <div>{eachResult.FastestLap.Time.time} </div>
                <div>{eachResult.FastestLap.lap} </div>
                <div>{eachResult.FastestLap.rank} </div>
                <div>{eachResult.grid} </div>
                <div>{eachResult.position} </div>
                <div>{eachResult.points} </div>
                <div>{eachResult.status} </div>
              </div>
            );
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
