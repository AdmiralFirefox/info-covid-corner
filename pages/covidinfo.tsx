import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { NextPage, GetStaticProps } from "next";
import { CountriesTypes } from "../types/CountriesTypes";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Fuse from "fuse.js";
import covidInfoStyles from "../styles/Home.module.scss";

const CovidInfo: NextPage<CountriesTypes> = ({ countries }) => {
  const [searchCountry, setSearchCountry] = useState("");

  const arrayCountries = Object.keys(countries);

  const fuse = new Fuse(arrayCountries, {
    includeScore: true,
    threshold: 0.3,
  });

  const results = fuse.search(searchCountry);

  const countryResults = results.map((result) => result.item);

  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      covidInfoStyles["covid-info-background"];

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

  return (
    <>
      <div className={covidInfoStyles["covid-info-title"]}>
        <h1>Search Country Cases</h1>
        <div className={covidInfoStyles["covid-info-logo"]}>
          <Image
            src="/assets/virus.svg"
            alt="Virus Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className={covidInfoStyles["covid-info-input-form"]}>
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

      <div className={covidInfoStyles["covid-info-country-result"]}>
        {countryResults
          .filter((country) => country !== "Global")
          .map((country, index) => {
            return (
              <div key={index}>
                <Link href={`countrycovidinfo/${country}`}>
                  <a>
                    <div
                      className={
                        covidInfoStyles["covid-info-country-result-card"]
                      }
                    >
                      {country}
                    </div>
                  </a>
                </Link>
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
