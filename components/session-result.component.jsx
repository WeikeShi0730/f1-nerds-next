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
              <div className="grid gap-x-8 grid-cols-9 justify-items-start">
                {/* Change gap */}
                <div>Position</div>
                <div>Number</div>
                <div>Driver</div>
                <div>Team</div>
                <div>Starting Grid</div>
                <div>Grid Delta</div>
                <div>Fastest Lap</div>
                <div>Status</div>
                <div>Points</div>
              </div>
              <br />
              {sessionResult.sortedDriverPositionNumber.map((eachDriver) => {
                return (
                  <div
                    key={eachDriver}
                    className="grid gap-x-8 grid-cols-9 justify-items-start"
                  >
                    <div>{sessionResult.Position[eachDriver]} </div>
                    <div>{eachDriver}</div>
                    <div>{sessionResult.BroadcastName[eachDriver]} </div>
                    <div>{sessionResult.TeamName[eachDriver]} </div>
                    <div>{sessionResult.GridPosition[eachDriver]} </div>
                    <div className="flex gap-x-2">
                      {sessionResult.GridDelta[eachDriver] > 0 ? (
                        <>
                          <div className="text-green-600">↾</div>
                          <div>+{sessionResult.GridDelta[eachDriver]} </div>
                        </>
                      ) : sessionResult.GridDelta[eachDriver] < 0 ? (
                        <>
                          <div className="text-red-600">⇂</div>
                          <div>{sessionResult.GridDelta[eachDriver]} </div>
                        </>
                      ) : (
                        <>
                          <div>‒</div>
                          <div>{sessionResult.GridDelta[eachDriver]} </div>
                        </>
                      )}
                    </div>
                    {sessionResult.FastestLapDriver === eachDriver ? (
                      <div>
                        {sessionResult.FastestLap[eachDriver]} <span className="text-purple-600">●</span>
                      </div>
                    ) : (
                      <div>{sessionResult.FastestLap[eachDriver]} </div>
                    )}
                    <div>{sessionResult.Status[eachDriver]} </div>
                    <div>{sessionResult.Points[eachDriver]} </div>
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
