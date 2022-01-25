import { useEffect } from "react";
import { NextPage } from "next";
import { format } from "date-fns";
import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import countryCasesInfoStyles from "../../styles/Home.module.scss";

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
      confirmed: number;
      deaths: number;
      recovered: number;
      population: number;
    };
  };
}

const Country: NextPage<CountryProps> = ({ countryInfo }) => {
  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      countryCasesInfoStyles["country-cases-info-background"];

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
        value={{ className: countryCasesInfoStyles["back-button"] }}
      >
        <Link href="/covidinfo">
          <a>
            <IoArrowBackCircle />
          </a>
        </Link>
      </IconContext.Provider>

      <div className={countryCasesInfoStyles["country-cases-title"]}>
        <h1>{countryInfo.All.country}</h1>
        <p>Continent: {countryInfo.All.continent}</p>
        {countryInfo.All.updated === undefined ? (
          <p>Date Unvailable...</p>
        ) : (
          <p>Updated: {countryInfoUpdate}</p>
        )}
      </div>

      <div className={countryCasesInfoStyles["country-cases-info-wrapper"]}>
        <div className={countryCasesInfoStyles["country-cases-info-content"]}>
          <div
            className={countryCasesInfoStyles["country-cases-info-card-cases"]}
          >
            <h1>Confirmed Cases:</h1>
            <p>{countryInfo.All.confirmed}</p>
          </div>
          <div
            className={countryCasesInfoStyles["country-cases-info-card-deaths"]}
          >
            <h1>Deaths:</h1>
            <p>{countryInfo.All.deaths}</p>
          </div>
          <div
            className={
              countryCasesInfoStyles["country-cases-info-card-recovered"]
            }
          >
            <h1>Recovered:</h1>
            <p>{countryInfo.All.recovered}</p>
          </div>
          <div
            className={
              countryCasesInfoStyles["country-cases-info-card-population"]
            }
          >
            <h1>Population:</h1>
            <p>{countryInfo.All.population}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://covid-api.mmediagroup.fr/v1/cases?country=all"
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
    `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
  );
  const countryInfo = await res.json();

  return {
    props: {
      countryInfo,
    },
  };
};