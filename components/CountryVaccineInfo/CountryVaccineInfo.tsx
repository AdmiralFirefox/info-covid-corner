import { FC } from "react";
import { useQuery, UseQueryResult } from "react-query";
import dayjs from "dayjs";
import { IoArrowBackCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { VaccineProps } from "../../types/CountryInfoTypes";
import styles from "../../styles/countryvaccineinfo/CountryVaccineInfo.module.scss";

interface CountryProps {
  country: string;
  countryUnselected: () => void;
}

const fetchData = async (country: string | undefined) => {
  return await Axios.get(
    `https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`
  );
};

const CountryVaccineInfo: FC<CountryProps> = ({
  country,
  countryUnselected,
}) => {
  const {
    data: countryInfo,
    isLoading,
    isError,
    isFetching,
  }: UseQueryResult<VaccineProps, Error> = useQuery<VaccineProps, Error>(
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
          <IconContext.Provider
            value={{
              className: styles["vaccine-back-button"],
            }}
          >
            <IoArrowBackCircle />
          </IconContext.Provider>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles["vaccine-loading-wrapper"]}
        >
          <div className={styles["vaccine-loading-content"]}>
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
          <IconContext.Provider
            value={{
              className: styles["vaccine-back-button"],
            }}
          >
            <IoArrowBackCircle />
          </IconContext.Provider>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles["vaccine-loading-wrapper"]}
        >
          <div className={styles["vaccine-loading-content"]}>
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
          <IconContext.Provider
            value={{
              className: styles["vaccine-back-button"],
            }}
          >
            <IoArrowBackCircle />
          </IconContext.Provider>
        </div>
        <div className={styles["vaccine-error-wrapper"]}>
          <div className={styles["vaccine-error-content"]}>
            <h1>Someting went wrong! Please try again later.</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ width: 0 }} onClick={countryUnselected}>
        <IconContext.Provider
          value={{
            className: styles["vaccine-back-button"],
          }}
        >
          <IoArrowBackCircle />
        </IconContext.Provider>
      </div>

      <div className={styles["vaccine-cases-title"]}>
        <h1>{countryInfo?.data.All.country}</h1>
        <p>Continent: {countryInfo?.data.All.continent}</p>
        {countryInfo?.data.All.updated === undefined ? (
          <p>Date Unvailable...</p>
        ) : (
          <p>Updated: {countryInfoUpdate}</p>
        )}
      </div>

      <div className={styles["country-vaccine-info-wrapper"]}>
        <div className={styles["country-vaccine-info-content"]}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className={styles["country-vaccine-info-card-administered"]}
          >
            <h1>Administered:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo?.data.All.administered as number}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles["country-vaccine-info-card-vaccinated"]}
          >
            <h1>Vaccinated:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo?.data.All.people_vaccinated as number}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles["country-vaccine-info-card-partially-vaccinated"]}
          >
            <h1>Partially Vaccinated:</h1>
            <p>
              <CountUp
                start={0}
                end={
                  countryInfo?.data.All.people_partially_vaccinated as number
                }
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles["country-vaccine-info-card-population"]}
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
    </>
  );
};

export default CountryVaccineInfo;
