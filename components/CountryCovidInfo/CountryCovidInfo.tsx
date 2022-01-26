import { FC } from "react";
import { useQuery, UseQueryResult } from "react-query";
import dayjs from "dayjs";
import { IoArrowBackCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Axios from "axios";
import countryCasesInfoStyles from "../../styles/Home.module.scss";

interface CountryProps {
  data: {
    All: {
      country: string;
      continent: string;
      updated: string;
      confirmed: number;
      deaths: number;
      recovered: number;
      population: number;
    };
  };
}

interface CountryCasesProps {
  country: string;
  countryUnselected: () => void;
}

const fetchData = async (country: string | undefined) => {
  return await Axios.get(
    `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
  );
};

const CountryCovidInfo: FC<CountryCasesProps> = ({
  country,
  countryUnselected,
}) => {
  const {
    data: countryInfo,
    isLoading,
    isError,
  }: UseQueryResult<CountryProps, Error> = useQuery<CountryProps, Error>(
    ["posts", country],
    () => fetchData(country),
    {
      staleTime: 30000,
      enabled: Boolean(country),
    }
  );

  const countryInfoUpdate =
    countryInfo?.data.All.updated !== undefined &&
    dayjs(countryInfo?.data.All.updated).format("MM/DD/YYYY, h:mm:ss a");

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Someting went wrong... please try again later</h1>
      </div>
    );
  }

  return (
    <>
      <IconContext.Provider
        value={{ className: countryCasesInfoStyles["back-button"] }}
      >
        <div onClick={countryUnselected}>
          <IoArrowBackCircle />
        </div>
      </IconContext.Provider>

      <div className={countryCasesInfoStyles["country-cases-title"]}>
        <h1>{countryInfo?.data.All.country}</h1>
        <p>Continent: {countryInfo?.data.All.continent}</p>
        {countryInfo?.data.All.updated === undefined ? (
          <p>Date Unvailable...</p>
        ) : (
          <p>Updated: {countryInfoUpdate}</p>
        )}
      </div>

      <div className={countryCasesInfoStyles["country-cases-info-wrapper"]}>
        <div className={countryCasesInfoStyles["country-cases-info-content"]}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className={countryCasesInfoStyles["country-cases-info-card-cases"]}
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
            className={countryCasesInfoStyles["country-cases-info-card-deaths"]}
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
            className={
              countryCasesInfoStyles["country-cases-info-card-recovered"]
            }
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
            className={
              countryCasesInfoStyles["country-cases-info-card-population"]
            }
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

export default CountryCovidInfo;
