import React, { useState, useEffect } from "react";
import { server } from "../config";

const SessionResult = ({ gp, year, session, setSessionDataLoading }) => {
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
          <div className="flex overflow-x-auto">
            <div className="shrink-0 p-2">
              <div className="grid grid-cols-8 justify-items-center">
                <div>Position</div>
                <div>Driver</div>
                <div>Grid</div>
                <div>Points</div>
                <div>Fastest Lap Time</div>
                <div>Fastest Lap</div>
                <div>Fastest Lap Rank</div>
                <div>Status</div>
              </div>
              {sessionResult.map((eachResult, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-8 justify-items-center"
                  >
                    <div>{eachResult.position} </div>
                    <div>{eachResult.Driver?.code} </div>
                    <div>{eachResult.grid} </div>
                    <div>{eachResult.points} </div>
                    <div>{eachResult.FastestLap?.Time.time} </div>
                    <div>{eachResult.FastestLap?.lap} </div>
                    <div>{eachResult.FastestLap?.rank} </div>
                    <div>{eachResult.status} </div>
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
