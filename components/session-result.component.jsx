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
              <div className="grid gap-x-8 grid-cols-8 justify-items-start">
                <div>Position</div>
                <div>Number</div>
                <div>Driver</div>
                <div>Team</div>
                <div>Grid</div>
                <div>Points</div>
                <div>Fastest Lap</div>
                <div>Status</div>
              </div>
              {sessionResult.sortedDriverPositionNumber.map((eachDriver) => {
                return (
                  <div
                    key={eachDriver}
                    className="grid gap-x-8 grid-cols-8 justify-items-start"
                  >
                    <div>{sessionResult.Position[eachDriver]} </div>
                    <div>{eachDriver}</div>
                    <div>{sessionResult.BroadcastName[eachDriver]} </div>
                    <div>{sessionResult.TeamName[eachDriver]} </div>
                    <div>{sessionResult.GridPosition[eachDriver]} </div>
                    <div>{sessionResult.Points[eachDriver]} </div>
                    <div>{sessionResult.FastestLap[eachDriver]} </div>
                    <div>{sessionResult.Status[eachDriver]} </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SessionResult;
