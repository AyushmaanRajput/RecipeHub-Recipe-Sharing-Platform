import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Text } from "@chakra-ui/react";

const Contribution = ({ user }) => {
  const userData = user.map((user) => ({
    username: user.name,
    totalPosts: user.recipes.length,
  }));

  const labels = userData.map((user) => user.username);
  const data = userData.map((user) => user.totalPosts);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Posts",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ width: "75%", margin: "auto" }}>
      <h1 style={{ fontWeight: "bold", fontSize : "25px", margin : "30px 0" }}>Contributions by all users</h1>
      <Bar data={chartData} />
    </div>
  );
};

export default Contribution;