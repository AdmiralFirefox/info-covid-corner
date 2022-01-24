import { FC } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { CountryListProps } from "../../types/CovidInfoTypes";
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
  return (
    <>
      <div className={countryListStyles["country-lists-title"]}>
        <h1>Countries</h1>
        <FormControl variant="filled" className="select-wrapper">
          <InputLabel
            id="demo-simple-select-label"
            className="select-input-label"
          >
            Sort by:
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Countries"
            variant="filled"
            className="select-items"
            onChange={handleSelectChange}
            value={sortCovidInfo}
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

              <p className={countryListStyles["country-list-card-title"]}>
                Updated:
              </p>
              {country.Date === undefined ? (
                <p className={countryListStyles["country-list-card-content"]}>
                  Date Unvailable...
                </p>
              ) : (
                <p className={countryListStyles["country-list-card-content"]}>
                  {format(new Date(country.Date), "MM-dd-yyyy h:mm:ss a")}
                </p>
              )}

              <MoreInfoButton>More Info</MoreInfoButton>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CountryList;
