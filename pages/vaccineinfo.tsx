import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { CountriesTypes } from "../types/CountriesTypes";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Fuse from "fuse.js";
import vaccineInfoStyles from "../styles/Home.module.scss";

const VaccineInfo: NextPage<CountriesTypes> = ({ countries }) => {
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
      vaccineInfoStyles["vaccine-info-background"];

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
      <div className={vaccineInfoStyles["vaccine-info-title"]}>
        <h1>Search Country Vaccine Info</h1>
        <div className={vaccineInfoStyles["vaccine-info-logo"]}>
          <Image
            src="/assets/injection.svg"
            alt="Vaccine Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className={vaccineInfoStyles["vaccine-info-input-form"]}>
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

      <div className={vaccineInfoStyles["vaccine-info-country-result"]}>
        {countryResults
          .filter((country) => country !== "Global")
          .map((country, index) => {
            return (
              <div key={index}>
                <Link href={`countryvaccineinfo/${country}`}>
                  <a>
                    <div
                      className={
                        vaccineInfoStyles["vaccine-info-country-result-card"]
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

export default VaccineInfo;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://covid-api.mmediagroup.fr/v1/vaccines?country=all"
  );
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
