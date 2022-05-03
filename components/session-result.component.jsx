import React, { useState, useEffect } from "react";

const SessionResult = ({ gp, year, session }) => {
  const [sessionResult, setSessionResult] = useState();
  useEffect(() => {
    const getData = async (gp, year, session) => {
      try {
        const res = await fetch(
          `${server}/api/year/${year}/weekend/${gp}/session/${session}`
        );
        const json = await res.json();
        console.log(json);
        // const round = json.round;
        // const sessions = json.weekend_sessions;
        // setRound(round);
        // setSessions(sessions);
        // setSessionsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (
      gp !== undefined &&
      gp !== null &&
      session !== undefined &&
      session !== null
    ) {
      setSessionsLoading(true);
      // clear other sections //
      setRound(null);
      setSession(null);
      setSelectedDrivers(null);
      setSessions(null);
      setDrivers(null);
      setSessionDataWithId([]);
      // fetch new data //
      getData(gp.value, year.value);
    }
  }, [gp, setSelectedDrivers, setSession]);
  return <div>SessionResult</div>;
};

export default SessionResult;
