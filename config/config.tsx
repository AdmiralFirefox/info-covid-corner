//Chart Options
export const options = {
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
      text: "Number of Confirmed Cases",
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
export const options2 = {
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
      text: "Number of New Cases Each Day",
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
