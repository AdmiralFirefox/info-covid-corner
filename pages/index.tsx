import { useState, useEffect } from "react";
import Image from "next/image";
import { GetStaticProps } from "next";
import type { NextPage } from "next";
import { format } from "date-fns";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import CountryList from "../components/CountryList/countrylist";
import { CovidInfoProps } from "../types/CovidInfoTypes";
import ReactPaginate from "react-paginate";
import { SelectChangeEvent } from "@mui/material/Select";
import homeStyles from "../styles/Home.module.scss";

const Home: NextPage<CovidInfoProps> = ({ covidData }) => {
  const countries = covidData.Countries;

  const [sortCovidInfo, setSortCovidInfo] = useState("cases-desc");

  const sortedCountry = countries.sort((a, b) =>
    sortCovidInfo === "cases-asc"
      ? a.TotalConfirmed > b.TotalConfirmed
        ? 1
        : -1
      : sortCovidInfo === "cases-desc"
      ? b.TotalConfirmed > a.TotalConfirmed
        ? 1
        : -1
      : sortCovidInfo === "deaths-asc"
      ? a.TotalDeaths > b.TotalDeaths
        ? 1
        : -1
      : sortCovidInfo === "deaths-desc"
      ? b.TotalDeaths > a.TotalDeaths
        ? 1
        : -1
      : sortCovidInfo === "recovered-asc"
      ? a.TotalRecovered > b.TotalRecovered
        ? 1
        : -1
      : sortCovidInfo === "recovered-desc"
      ? b.TotalRecovered > a.TotalRecovered
        ? 1
        : -1
      : 0
  );

  const [pageNumber, setPageNumber] = useState(0);

  const countryPerPage = 10;
  const pagesVisited = pageNumber * countryPerPage;

  const displayCountryData = sortedCountry.slice(
    pagesVisited,
    pagesVisited + countryPerPage
  );

  const pageCount = Math.ceil(sortedCountry.length / countryPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  //Handling Select Changes
  const handleSelectChange = (e: SelectChangeEvent) => {
    setSortCovidInfo(e.target.value);
  };

  //Covid Global Cases Date Updated
  const globalInfoUpdate =
    covidData.Global.Date !== undefined &&
    format(new Date(covidData.Global.Date), "MM/DD/YYYY, h:mm:ss a");

  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      homeStyles["home-backround"];

    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  return (
    <>
      <div className={homeStyles["web-title"]}>
        <h1>Covid Corner</h1>
        <div className={homeStyles["web-logo"]}>
          <Image
            src="/assets/virus-web-logo.svg"
            alt="Virus Web Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className={homeStyles["global-info-title"]}>
        <h1>Global Info</h1>
        {covidData.Global.Date === undefined ? (
          <p>Date Unvailable...</p>
        ) : (
          <p>Updated: {globalInfoUpdate}</p>
        )}
      </div>

      <div className={homeStyles["global-info-content-wrapper"]}>
        <div className={homeStyles["global-info-content"]}>
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
                end={covidData.Global.TotalConfirmed}
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
                end={covidData.Global.TotalDeaths}
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
                end={covidData.Global.TotalRecovered}
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
                end={covidData.Global.NewConfirmed}
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
                end={covidData.Global.NewDeaths}
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
                end={covidData.Global.NewRecovered}
                duration={3}
                separator=","
              />
            </p>
          </motion.div>
        </div>
      </div>

      <CountryList
        covidInfo={displayCountryData}
        sortCovidInfo={sortCovidInfo}
        handleSelectChange={handleSelectChange}
      />
      <div className="pagination-wrapper">
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={changePage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          containerClassName={"pagination-buttons-container"}
          previousLinkClassName={"previous-button"}
          nextLinkClassName={"next-button"}
          disabledClassName={"disabled-button"}
          activeClassName={"active-button"}
        />
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
    revalidate: 60,
  };
};
