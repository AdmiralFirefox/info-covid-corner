export interface CountryListProps {
  ID: string;
  Country: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Date: string;
}

export interface CovidInfoProps {
  covidData: {
    Global: {
      TotalConfirmed: number;
      TotalDeaths: number;
      TotalRecovered: number;
      NewConfirmed: number;
      NewDeaths: number;
      NewRecovered: number;
      Date: string;
    };
    Countries: CountryListProps[];
  };
}
