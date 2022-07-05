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
}

const CountryChartInfo = async (country: string | undefined) => {
  return await Axios.get(
    `https://covid-api.mmediagroup.fr/v1/history?country=${country}&status=confirmed`
  );
};

const CovidInfoChart: FC<CovidInfoChartProps> = ({ country }) => {
  const {
    data: chartInfo,
    isLoading,
    isError,
    isFetching,
  }: UseQueryResult<ChartInfoProps, Error> = useQuery<ChartInfoProps, Error>(
    ["chartInfo", country],
    () => CountryChartInfo(country),
    {
      refetchOnWindowFocus: false,
      staleTime: 30000,
      enabled: Boolean(country),
    }
  );

  const chartLabels =
    chartInfo?.data.All.dates !== undefined &&
    Object.keys(chartInfo?.data.All.dates)
      .splice(0, 15)
      .map((data) => dayjs(data).format("MM/DD/YYYY"));

  const chartData =
    chartInfo?.data.All.dates !== undefined &&
    Object.values(chartInfo?.data.All.dates)
      .splice(0, 15)
      .map((data) => data);

  // Line Chart Data
  const userData = {
    labels: chartLabels as string[],
    datasets: [
      {
        label: "Confirmed Cases",
        data: chartData as number[],
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
        text: "Confirmed Cases",
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
    </>
  );
};

export default CovidInfoChart;
