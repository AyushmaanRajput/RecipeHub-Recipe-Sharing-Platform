import React from 'react';
import { Radar } from 'react-chartjs-2';

const Cuisines = ({ recipes }) => {
  const cuisines = [
    "Mexican",
    "Italian",
    "Chinese",
    "Indian",
    "German",
    "Greek",
    "Filipino",
    "Japanese",
  ];

  // Count the occurrences of each cuisine
  const cuisineCount = cuisines.reduce((acc, cuisine) => {
    acc[cuisine] = 0;
    return acc;
  }, {});

  recipes.forEach((recipe) => {
    recipe.cuisine.forEach((cuisine) => {
      cuisineCount[cuisine]++;
    });
  });

  const data = {
    labels: Object.keys(cuisineCount),
    datasets: [
      {
        label: "Cuisine Count",
        data: Object.values(cuisineCount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...Object.values(cuisineCount)) + 1,
      },
    },
  };

  return (
    <div style={{ width : "40%", margin : 'auto' }}>
      <h2  style={{ fontWeight: "bold", fontSize : "25px", margin : "30px 0" }}>Cuisines Distribution</h2>
      <Radar data={data} options={options} />
    </div>
  );
};

export default Cuisines;
