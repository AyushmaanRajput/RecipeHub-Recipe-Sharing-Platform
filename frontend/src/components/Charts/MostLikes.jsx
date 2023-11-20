import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const MostLikes = ({ recipe }) => {

    const chartData = recipe.map((recipe) => ({
        recipeName: recipe.title,
        likes: recipe.likes.length,
        comments: recipe.comments.length,
      }));
    
      const labels = chartData.map((data) => data.recipeName);
      const likesData = chartData.map((data) => data.likes);
      const commentsData = chartData.map((data) => data.comments);
    
      const chartConfig = {
        labels: labels,
        datasets: [
          {
            label: "Likes Count",
            data: likesData,
            backgroundColor: "rgba(214, 114, 13, 0.2)",
            borderColor: "#4e3502",
            borderWidth: 1,
          },
          {
            label: "Comments Count",
            data: commentsData,
            backgroundColor: "rgba(12, 87, 208, 0.2)",
            borderColor: "#051b6b",
            borderWidth: 1,
          },
        ],
      };

  return (
    <div style={{ width: "75%", margin: "auto" }}>
      <h1 style={{ fontWeight: "bold", fontSize : "25px", margin : "30px 0" }}>Recipes with Interactions</h1>
      <Bar data={chartConfig} />
    </div>
  );
};

export default MostLikes;
