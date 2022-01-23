import { useState, useEffect } from "react";
import Image from "next/image";
import { GetStaticProps } from "next";
import type { NextPage } from "next";
import { format } from "date-fns";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import homeStyles from "../styles/Home.module.scss";

interface CovidInfoProps {
  covidData: {
    Global: {
      TotalConfirmed: number;
      TotalDeaths: number;
      TotalRecovered: number;
      NewConfirmed: number;
      NewDeaths: number;
      NewRecovered: number;
      Date: string;
    };
  };
}

const Home: NextPage<CovidInfoProps> = ({ covidData }) => {
  const [covidInfo, setCovidInfo] = useState(covidData);

  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      homeStyles["home-backround"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  const globalInfoUpdate = format(
    new Date(covidInfo.Global.Date),
    "MM-dd-yyyy h:mm:ss a"
  );

  return (
    <>
      <div className={homeStyles["web-title"]}>
        <h1>Covid Corner</h1>
        <div className={homeStyles["web-logo"]}>
          <Image
            src="/assets/virus-web-logo.svg"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className={homeStyles["global-info-title"]}>
        <h1>Global Info</h1>
        {covidInfo.Global.Date === undefined ? (
          <p>Date Unvailable...</p>
        ) : (
          <p>Updated: {globalInfoUpdate}</p>
        )}
      </div>

      <div className={homeStyles["global-info-content-wrapper"]}>
        <div className={homeStyles["global-info-content-content"]}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className={homeStyles["global-info-content-card-cases"]}
          >
            <h1>Confirmed Cases:</h1>
            <p>
              <CountUp
                start={0}
                end={covidInfo.Global.TotalConfirmed}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={homeStyles["global-info-content-card-deaths"]}
          >
            <h1>Deaths:</h1>
            <p>
              <CountUp
                start={0}
                end={covidInfo.Global.TotalDeaths}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={homeStyles["global-info-content-card-recovered"]}
          >
            <h1>Recovered:</h1>
            <p>
              <CountUp
                start={0}
                end={covidInfo.Global.TotalRecovered}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={homeStyles["global-info-content-card-cases"]}
          >
            <h1>New Cases:</h1>
            <p>
              <CountUp
                start={0}
                end={covidInfo.Global.NewConfirmed}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={homeStyles["global-info-content-card-deaths"]}
          >
            <h1>New Deaths:</h1>
            <p>
              <CountUp
                start={0}
                end={covidInfo.Global.NewDeaths}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={homeStyles["global-info-content-card-recovered"]}
          >
            <h1>New Recovered:</h1>
            <p>
              <CountUp
                start={0}
                end={covidInfo.Global.NewRecovered}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://api.covid19api.com/summary");
  const covidData = await res.json();

  return {
    props: {
      covidData,
    },
  };
};
