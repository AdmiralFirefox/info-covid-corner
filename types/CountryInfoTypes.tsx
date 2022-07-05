export interface CasesProps {
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

export interface ChartInfoProps {
  data: {
    All: {
      dates: number[] | undefined;
    };
  };
}

export interface VaccineProps {
  data: {
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
