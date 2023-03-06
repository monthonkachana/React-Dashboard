import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./App.css";
function App() {
  const [petPrices, setPetPrice] = useState([]);
  const [petChart, setPetChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [20, 40, 60, 50, 70, 90, 80, 91, 96, 99, 98],
      },
    ],
  });

  useEffect(() => {
    fetch("https://colorful-moccasins-duck.cyclic.app/pets_price")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPetPrice(result);
      });

    fetch("https://colorful-moccasins-duck.cyclic.app/pets_price_chart")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPetChart({
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: result.petNames,
            },
          },
          series: [
            {
              name: "ราคา",
              data: result.prices,
            },
          ],
        });
      });
  }, []);

  return (
    <div>
      <h1>Max-Monthon-Test-Dashboard</h1>
      <ul>
        {petPrices.map((pet) => (
          <li key={pet.id}>
            {pet.petName} {pet.price}
          </li>
        ))}
      </ul>

      <Chart
        options={petChart.options}
        series={petChart.series}
        type="bar"
        width="500"
        id="chart"
      />
    </div>
  );
}

export default App;
