import React, { useState, createContext } from "react";
import Head from "next/head";
import LapChart from "../components/lap-chart.component";
import Telemetry from "../components/telemetry.component";

export const SelctionsContext = createContext();

export default function Home() {
  const [year, setYear] = useState();
  const [gp, setGp] = useState();
  const [session, setSession] = useState();
  const [driver, setDriver] = useState();
  const [lap, setLap] = useState();
  const value = {
    year,
    setYear,
    gp,
    setGp,
    session,
    setSession,
    driver,
    setDriver,
    lap,
    setLap,
  };

  return (
    <div className="">
      <Head>
        <title>F1 Nerds</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <SelctionsContext.Provider value={value}>
          <LapChart />
          <Telemetry />
        </SelctionsContext.Provider>
      </main>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const gp_res = await fetch(`https://ergast.com/api/f1/${year}.json`);
//   const gp_json = await gp_res.json();
//   const gps = gp_json.MRData.RaceTable.Races.map((race) => ({
//     race: race.raceName,
//   }));

//   return {
//     props: {
//       gps,
//     },
//   };
// }
