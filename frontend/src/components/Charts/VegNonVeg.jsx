import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const VegNonVegChart = ({ recipeData }) => {

  const vegCount = recipeData.filter(recipe => recipe.veg).length;
  const nonVegCount = recipeData.length - vegCount;

  const chartData = {
    labels: ['Veg Recipes', 'Non-Veg Recipes'],
    datasets: [
      {
        data: [vegCount, nonVegCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width : "40%", margin : 'auto' }} >
      <h2  style={{ fontWeight: "bold", fontSize : "25px", margin : "30px 0" }}>Veg and Non-Veg Recipes</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default VegNonVegChart;
