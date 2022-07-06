import { FC } from "react";
import { useQuery, UseQueryResult } from "react-query";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { IoArrowBackCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { CasesProps } from "../../types/CountryInfoTypes";
const CovidInfoChart = dynamic(() => import("../Chart/CovidInfoChart"));
import styles from "../../styles/countrycovidinfo/CountryCovidInfo.module.scss";

interface CountryProps {
  country: string;
  countryUnselected: () => void;
}

const fetchData = async (country: string | undefined) => {
  return await Axios.get(
    `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
  );
};

const CountryCovidInfo: FC<CountryProps> = ({ country, countryUnselected }) => {
  const {
    data: countryInfo,
    isLoading,
    isError,
    isFetching,
  }: UseQueryResult<CasesProps, Error> = useQuery<CasesProps, Error>(
    ["country", country],
    () => fetchData(country),
    {
      refetchOnWindowFocus: false,
      cacheTime: 5000,
      enabled: Boolean(country),
    }
  );

  const countryInfoUpdate =
    countryInfo?.data.All.updated !== undefined &&
    dayjs(countryInfo?.data.All.updated).format("MM/DD/YYYY, h:mm:ss a");

  if (isLoading) {
    return (
      <>
        <div style={{ width: 0 }} onClick={countryUnselected}>
          <IconContext.Provider value={{ className: styles["back-button"] }}>
            <IoArrowBackCircle />
          </IconContext.Provider>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles["cases-loading-wrapper"]}
        >
          <div className={styles["cases-loading-content"]}>
            <CircularProgress color="secondary" size="3rem" />
            <h1>Loading Country...</h1>
          </div>
        </motion.div>
      </>
    );
  }

  if (isFetching) {
    return (
      <>
        <div style={{ width: 0 }} onClick={countryUnselected}>
          <IconContext.Provider value={{ className: styles["back-button"] }}>
            <IoArrowBackCircle />
          </IconContext.Provider>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles["cases-loading-wrapper"]}
        >
          <div className={styles["cases-loading-content"]}>
            <CircularProgress color="secondary" size="3rem" />
            <h1>Loading Country...</h1>
          </div>
        </motion.div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div style={{ width: 0 }} onClick={countryUnselected}>
          <IconContext.Provider value={{ className: styles["back-button"] }}>
            <IoArrowBackCircle />
          </IconContext.Provider>
        </div>
        <div className={styles["cases-error-wrapper"]}>
          <div className={styles["cases-error-content"]}>
            <h1>Someting went wrong! Please try again later.</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ width: 0 }} onClick={countryUnselected}>
        <IconContext.Provider value={{ className: styles["back-button"] }}>
          <IoArrowBackCircle />
        </IconContext.Provider>
      </div>

      <div className={styles["country-cases-title"]}>
        <h1>{countryInfo?.data.All.country}</h1>
        <p>Continent: {countryInfo?.data.All.continent}</p>
        {countryInfo?.data.All.updated === undefined ? (
          <p>Date Unvailable...</p>
        ) : (
          <p>Updated: {countryInfoUpdate}</p>
        )}
      </div>

      <div className={styles["country-cases-info-wrapper"]}>
        <div className={styles["country-cases-info-content"]}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className={styles["country-cases-info-card-cases"]}
          >
            <h1>Confirmed Cases:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo?.data.All.confirmed as number}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles["country-cases-info-card-deaths"]}
          >
            <h1>Deaths:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo?.data.All.deaths as number}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles["country-cases-info-card-recovered"]}
          >
            <h1>Recovered:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo?.data.All.recovered as number}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles["country-cases-info-card-population"]}
          >
            <h1>Population:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo?.data.All.population as number}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>
        </div>
      </div>

      <CovidInfoChart
        country={country}
        status="confirmed"
        chart1Label="Confirmed Cases"
        chart2Label="New Cases Each Day"
        chart1Title="Number of Confirmed Cases"
        chart2Title="Number of New Cases Each Day"
      />
      <CovidInfoChart
        country={country}
        status="deaths"
        chart1Label="Confirmed Deaths"
        chart2Label="New Deaths Each Day"
        chart1Title="Number of Confirmed Deaths"
        chart2Title="Number of New Deaths Each Day"
      />
    </>
  );
};

export default CountryCovidInfo;
