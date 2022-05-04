import React, { useState, useEffect } from "react";
import { server } from "../config";

const SessionResult = ({ gp, year, session }) => {
  const [sessionResult, setSessionResult] = useState(null);
  useEffect(() => {
    const getData = async (gp, year, session) => {
      try {
        const res = await fetch(
          `${server}/api/year/${year}/weekend/${gp}/session/${session}`
        );
        // setSessionsLoading(false);
        return await res.json();
      } catch (error) {
        console.error(error);
        return null;
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
      console.log(gp.value, year.value, session.value);
      const sessionResult = getData(gp.value, year.value, session.value);
      setSessionResult(sessionResult);
    } else {
      setSessionResult(null);
    }
  }, [gp, session, year]);
  return <>{sessionResult ? "sessionResult" : null}</>;
};

export default SessionResult;
