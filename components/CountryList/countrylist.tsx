import { FC, useState } from "react";
import CountryModal from "../Modal/countrymodal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { CountryListProps } from "../../types/CovidInfoTypes";
import { useLockedBody } from "../../hooks/useLockedBody";
import countryListStyles from "../../styles/Home.module.scss";

interface CountryCovidListProps {
  covidInfo: CountryListProps[];
  sortCovidInfo: string;
  handleSelectChange: (e: SelectChangeEvent) => void;
}

const MoreInfoButton = styled(Button)(() => ({
  color: "#fff",
  backgroundColor: "hsl(233, 37%, 47%)",
  marginTop: "1em",
  "&:hover": {
    backgroundColor: "hsl(233, 37%, 55%)",
  },
}));

const CountryList: FC<CountryCovidListProps> = ({
  covidInfo,
  sortCovidInfo,
  handleSelectChange,
}) => {
  const [countryModal, setCountryModal] = useState("");
  const [locked, setLocked] = useState(false);

  const handleToggleCountryModal = (id: string) => {
    setLocked(true);
    if (countryModal === id) {
      setCountryModal("");
    }

    setCountryModal(id);
  };

  const handleCloseCountryModal = (id: string) => {
    setLocked(false);
    if (countryModal === id) {
      setCountryModal("");
    }
  };

  useLockedBody(locked);

  return (
    <>
      <div className={countryListStyles["country-lists-title"]}>
        <h1>Countries</h1>
        <FormControl
          variant="filled"
          color="info"
          sx={{
            background: "#37474f",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color: "#fff",
            }}
          >
            Sort by:
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Countries"
            variant="filled"
            onChange={handleSelectChange}
            value={sortCovidInfo}
            sx={{
              color: "#fff",
            }}
            MenuProps={{
              sx: {
                ".MuiPaper-root": {
                  background: "none",
                  boxShadow: "5px 10px 20px 1px rgba(0,0,0,0.5)",
                },
                ".MuiMenu-list": {
                  backgroundColor: "#37474f",
                  borderRadius: "5px",
                },
                ".MuiMenuItem-root": {
                  color: "#fff",
                  transition: "background 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "hsl(200, 18%, 35%)",
                  },
                },
              },
            }}
          >
            <MenuItem value="cases-asc">Cases - Asc</MenuItem>
            <MenuItem value="cases-desc">Cases - Desc</MenuItem>
            <MenuItem value="deaths-asc">Deaths - Asc</MenuItem>
            <MenuItem value="deaths-desc">Deaths - Desc</MenuItem>
            <MenuItem value="recovered-asc">Recovered - Asc</MenuItem>
            <MenuItem value="recovered-desc">Recovered - Desc</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={countryListStyles["country-list-card-wrapper"]}>
        {covidInfo.map((country) => {
          return (
            <div
              key={country.ID}
              className={countryListStyles["country-list-card"]}
            >
              <h1>{country.Country}</h1>
              <p className={countryListStyles["country-list-card-title"]}>
                Confirmed Cases:
              </p>
              <p className={countryListStyles["country-list-card-content"]}>
                {country.TotalConfirmed.toLocaleString()}
              </p>
              <p className={countryListStyles["country-list-card-title"]}>
                Deaths:
              </p>
              <p className={countryListStyles["country-list-card-content"]}>
                {country.TotalDeaths.toLocaleString()}
              </p>
              <p className={countryListStyles["country-list-card-title"]}>
                Recovered:
              </p>
              <p className={countryListStyles["country-list-card-content"]}>
                {country.TotalRecovered.toLocaleString()}
              </p>
              {/* <p className={countryListStyles["country-list-card-title"]}>
                Updated:
              </p>
              {country.Date === undefined ? (
                <p className={countryListStyles["country-list-card-content"]}>
                  Date Unvailable...
                </p>
              ) : (
                <p className={countryListStyles["country-list-card-content"]}>
                  {format(new Date(country.Date), "MM/dd/yyyy, h:mm:ss a")}
                </p>
              )} */}

              <MoreInfoButton
                onClick={() => handleToggleCountryModal(country.ID)}
              >
                More Info
              </MoreInfoButton>
            </div>
          );
        })}
      </div>

      {covidInfo.map((country) => {
        return (
          <CountryModal
            key={country.ID}
            active={countryModal === country.ID}
            id={country.ID}
            handleCloseCountryModal={() => handleCloseCountryModal(country.ID)}
            countryTitle={country.Country}
            newConfirmed={country.NewConfirmed}
            newDeaths={country.NewDeaths}
            newRecovered={country.NewRecovered}
          />
        );
      })}
    </>
  );
};

export default CountryList;
