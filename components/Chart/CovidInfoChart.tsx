import { FC } from "react";
import { useQuery, UseQueryResult } from "react-query";
import dayjs from "dayjs";
import Axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import { motion } from "framer-motion";
import { ChartInfoProps } from "../../types/CountryInfoTypes";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "../../styles/countrycovidinfo/CovidInfoChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CovidInfoChartProps {
  country: string;
  status: string;
  chart1Label: string;
  chart2Label: string;
  chart1Title: string;
  chart2Title: string;
}

const CountryChartInfo = async (
  country: string | undefined,
  status: string | undefined
) => {
  return await Axios.get(
    `https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=${status}`
  );
};

const CovidInfoChart: FC<CovidInfoChartProps> = ({
  country,
  status,
  chart1Label,
  chart2Label,
  chart1Title,
  chart2Title,
}) => {
  const {
    data: chartInfo,
    isLoading,
    isError,
    isFetching,
  }: UseQueryResult<ChartInfoProps, Error> = useQuery<ChartInfoProps, Error>(
    ["chartInfo", country, status],
    () => CountryChartInfo(country, status),
    {
      refetchOnWindowFocus: false,
      staleTime: 30000,
      enabled: Boolean(country) && Boolean(status),
    }
  );

  // Chart Labels
  const chartLabels =
    chartInfo?.data.All.dates !== undefined &&
    Object.keys(chartInfo?.data.All.dates)
      .splice(0, 15)
      .map((data) => dayjs(data).add(1, "day").format("MM/DD/YYYY"));

  // Line Chart 1 Data
  const chartData =
    chartInfo?.data.All.dates !== undefined &&
    Object.values(chartInfo?.data.All.dates)
      .splice(0, 15)
      .map((data) => data);

  const chartData2 =
    chartInfo?.data.All.dates !== undefined &&
    Object.values(chartInfo?.data.All.dates)
      .splice(1, 16)
      .map((data) => data);

  // Subtracting chartData and chartData2
  const absDifference = (arr1: number[], arr2: number[]) => {
    const res = [];
    for (let i = 0; i < arr1.length; i++) {
      const el = (arr1[i] || 0) - (arr2[i] || 0);
      res[i] = el;
    }
    return res;
  };

  // Line Chart 2 Data
  const combinedChart = absDifference(
    chartData as number[],
    chartData2 as number[]
  );

  // Line Chart 1 Data Config
  const userData = {
    labels: chartLabels as string[],
    datasets: [
      {
        label: chart1Label,
        data: chartData as number[],
        borderColor: "#ba292e",
        backgroundColor: "#ba292e",
        pointBackgroundColor: "#e15d3a",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  // Line Chart 2 Data Config
  const userData2 = {
    labels: chartLabels as string[],
    datasets: [
      {
        label: chart2Label,
        data: combinedChart,
        borderColor: "#ba292e",
        backgroundColor: "#ba292e",
        pointBackgroundColor: "#e15d3a",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  //Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 15,
            weight: "700",
          },
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: chart1Title,
        font: {
          size: 25,
        },
        color: "#fff",
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#e15d3a",
          beginAtZero: true,
          font: {
            size: 13,
            weight: "600",
          },
        },
        grid: {
          color: "hsl(0, 0%, 25%)",
        },
      },
      x: {
        ticks: {
          color: "#e15d3a",
          beginAtZero: true,
          font: {
            size: 13,
            weight: "600",
          },
        },
        grid: {
          color: "hsl(0, 0%, 25%)",
        },
      },
    },
  };

  //Chart2 Options
  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 15,
            weight: "700",
          },
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: chart2Title,
        font: {
          size: 25,
        },
        color: "#fff",
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#e15d3a",
          beginAtZero: true,
          font: {
            size: 13,
            weight: "600",
          },
        },
        grid: {
          color: "hsl(0, 0%, 25%)",
        },
      },
      x: {
        ticks: {
          color: "#e15d3a",
          beginAtZero: true,
          font: {
            size: 13,
            weight: "600",
          },
        },
        grid: {
          color: "hsl(0, 0%, 25%)",
        },
      },
    },
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles["loading-chart-wrapper"]}
      >
        <div className={styles["loading-chart-content"]}>
          <LinearProgress
            sx={{ marginBottom: "1.25em", color: "hsl(36, 100%, 60%)" }}
          />
          <h1>Loading Chart</h1>
        </div>
      </motion.div>
    );
  }

  if (isFetching) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles["loading-chart-wrapper"]}
      >
        <div className={styles["loading-chart-content"]}>
          <LinearProgress
            sx={{ marginBottom: "1.25em", color: "hsl(36, 100%, 60%)" }}
          />
          <h1>Loading Chart</h1>
        </div>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <div className={styles["chart-error-wrapper"]}>
        <div className={styles["chart-error-content"]}>
          <h1>
            Someting went wrong when loading the Chart! Please refresh the page.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles["chart-wrapper"]}>
        <div className={styles["chart-content"]}>
          <Line options={options} data={userData} />
        </div>
      </div>
      <div className={styles["chart2-wrapper"]}>
        <div className={styles["chart2-content"]}>
          <Line options={options2} data={userData2} />
        </div>
      </div>
    </>
  );
};

export default CovidInfoChart;
