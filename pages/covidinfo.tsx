import { useState, useEffect, ChangeEvent } from "react";
import { NextPage, GetStaticProps } from "next";
import { CountriesTypes } from "../types/CountriesTypes";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Fuse from "fuse.js";
import CountryCovidInfo from "../components/CountryCovidInfo/CountryCovidInfo";
import styles from "../styles/pages/CovidInfo.module.scss";

const CovidInfo: NextPage<CountriesTypes> = ({ countries }) => {
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<boolean | string>(
    false
  );

  const countrySelected = (country: string) => {
    if (selectedCountry === country) {
      return setSelectedCountry(true);
    }

    setSelectedCountry(country);
  };

  const countryUnselected = () => {
    setSelectedCountry(false);
  };

  const arrayCountries = Object.keys(countries);

  const fuse = new Fuse(arrayCountries, {
    includeScore: true,
    threshold: 0.3,
  });

  const results = fuse.search(searchCountry);

  const countryResults = results.map((result) => result.item);

  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      styles["covid-info-background"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  //Handling Search Country Change
  const handleSearchCountryChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchCountry(e.target.value);
  };

  if (selectedCountry) {
    return (
      <>
        {countryResults.map((country, index) => {
          return (
            <div key={index}>
              {selectedCountry === country && (
                <CountryCovidInfo
                  country={country}
                  countryUnselected={countryUnselected}
                />
              )}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className={styles["covid-info-title"]}>
        <h1>Search Country Cases</h1>
        <div className={styles["covid-info-logo"]}>
          <Image
            src="/assets/virus.svg"
            alt="Virus Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className={styles["covid-info-input-form"]}>
        <Paper
          sx={{
            p: "0.5em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "min(80%, 30em)",
            background: "#444444",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: "#fff", fontWeight: "500" }}
            placeholder="Search Countries"
            inputProps={{ "aria-label": "search countries" }}
            onChange={handleSearchCountryChange}
            value={searchCountry}
          />
        </Paper>
      </div>

      <div className={styles["covid-info-country-result"]}>
        {countryResults
          .filter((country) => country !== "Global")
          .map((country, index) => {
            return (
              <div
                key={index}
                className={styles["covid-info-country-result-card"]}
                onClick={() => countrySelected(country)}
              >
                {country}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CovidInfo;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://covid-api.mmediagroup.fr/v1/cases?country=all"
  );
  const countries = await res.json();

  return {
    props: {
      countries,
    },
    revalidate: 60,
  };
};
