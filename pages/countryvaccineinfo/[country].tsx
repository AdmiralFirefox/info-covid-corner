import { useEffect } from "react";
import { NextPage } from "next";
import { format } from "date-fns";
import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import countryVaccinesInfoStyles from "../../styles/Home.module.scss";

type ContextType = {
  params: {
    country: string;
  };
};

interface CountryProps {
  countryInfo: {
    All: {
      country: string;
      continent: string;
      updated: string;
      administered: number;
      people_vaccinated: number;
      people_partially_vaccinated: number;
      population: number;
    };
  };
}

const Country: NextPage<CountryProps> = ({ countryInfo }) => {
  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      countryVaccinesInfoStyles["vaccine-cases-info-background"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  const countryInfoUpdate =
    countryInfo.All.updated !== undefined &&
    format(new Date(countryInfo.All.updated), "MM/dd/yyyy, h:mm:ss a");

  return (
    <>
      <IconContext.Provider
        value={{ className: countryVaccinesInfoStyles["vaccine-back-button"] }}
      >
        <Link href="/vaccineinfo">
          <a>
            <IoArrowBackCircle />
          </a>
        </Link>
      </IconContext.Provider>

      <div className={countryVaccinesInfoStyles["vaccine-cases-title"]}>
        <h1>{countryInfo.All.country}</h1>
        <p>Continent: {countryInfo.All.continent}</p>
        {countryInfo.All.updated === undefined ? (
          <p>Date Unvailable...</p>
        ) : (
          <p>Updated: {countryInfoUpdate}</p>
        )}
      </div>

      <div
        className={countryVaccinesInfoStyles["country-vaccine-info-wrapper"]}
      >
        <div
          className={countryVaccinesInfoStyles["country-vaccine-info-content"]}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className={
              countryVaccinesInfoStyles[
                "country-vaccine-info-card-administered"
              ]
            }
          >
            <h1>Administered:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo.All.administered}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={
              countryVaccinesInfoStyles["country-vaccine-info-card-vaccinated"]
            }
          >
            <h1>Vaccinated:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo.All.people_vaccinated}
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
              countryVaccinesInfoStyles[
                "country-vaccine-info-card-partially-vaccinated"
              ]
            }
          >
            <h1>Partially Vaccinated:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo.All.people_partially_vaccinated}
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
              countryVaccinesInfoStyles["country-vaccine-info-card-population"]
            }
          >
            <h1>Population:</h1>
            <p>
              <CountUp
                start={0}
                end={countryInfo.All.population}
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

export default Country;

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://covid-api.mmediagroup.fr/v1/vaccines?country=all"
  );

  const countryData = await res.json();

  const arrayCountries = Object.keys(countryData);

  const paths = arrayCountries.map((country) => {
    return {
      params: { country: country },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: ContextType) => {
  const country = context.params.country;
  const res = await fetch(
    `https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`
  );
  const countryInfo = await res.json();

  return {
    props: {
      countryInfo,
    },
  };
};
