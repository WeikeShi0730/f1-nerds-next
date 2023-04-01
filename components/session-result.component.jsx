import React, { useState, useEffect, useContext } from "react";
import { server } from "../config";
import { SelectionsContext } from "../pages/index";

const SessionResult = ({ setSessionDataLoading }) => {
  const { year, gp, session } = useContext(SelectionsContext);
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
          setSessionDataLoading(true);
          const res = await fetch(
            `${server}/api/year/${year.value}/weekend/${gp.value}/session/${session.value}`
          );
          const sessionResult = await res.json();
          setSessionDataLoading(false);
          setSessionResult(sessionResult);
        } else {
          setSessionResult(null);
        }
      } catch (error) {
        setSessionDataLoading(false);
        console.error(error);
      }
    };

    getData(gp, year, session);
  }, [gp, session, setSessionDataLoading, year]);
  return (
    <>
      {sessionResult ? (
        <div className="px-5 py-10 mx-auto">
          <div className="flex justify-center text-lg mb-8">Session Result</div>
          <div className="flex justify-center items-center overflow-x-auto">
            <div className="shrink-0 p-2">
              <div className="grid grid-cols-6 justify-items-center">
                <div>Position</div>
                <div>Driver</div>
                <div>Grid</div>
                <div>Points</div>
                {/* <div>Fastest Lap Time</div>
                <div>Fastest Lap</div>
                <div>Fastest Lap Rank</div> */}
                <div>Time</div>
                <div>Status</div>
              </div>
              {Object.keys(sessionResult.DriverNumber).map(
                (eachDriver) => {
                  return (
                    <div
                      key={eachDriver}
                      className="grid grid-cols-6 justify-items-center"
                    >
                      {/* {console.log(index)} */}
                      <div>{sessionResult.Position[eachDriver]} </div>
                      <div>{sessionResult.BroadcastName[eachDriver]} </div>
                      <div>{sessionResult.GridPosition[eachDriver]} </div>
                      <div>{sessionResult.Points[eachDriver]} </div>
                      {/* <div>{sessionResult.FastestLap?.Time.time} </div>
                    <div>{sessionResult.FastestLap?.lap} </div>
                    <div>{sessionResult.FastestLap?.rank} </div> */}
                      <div>{sessionResult.Time[eachDriver]} </div>
                      <div>{sessionResult.Status[eachDriver]} </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SessionResult;
