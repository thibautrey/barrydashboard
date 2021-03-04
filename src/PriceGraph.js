import React, { useEffect, useState } from "react";
import { Bar } from "@reactchartjs/react-chart.js";
import { format } from "date-fns";
import { map, sortBy } from "lodash";
import useInterval from "@use-it/interval";

import { getTicks } from "./requests";

const PriceGraph = () => {
  const [ticks, setTicks] = useState([]);

  const updateData = () => {
    getTicks().then((data) => {
      setTicks(
        sortBy(
          map(data, ({ start, end, value }) => [
            `${format(new Date(start), "HH")}-${format(new Date(end), "HH")}`,
            value,
          ]),
          (item) => item[0]
        )
      );
    });
  };

  useEffect(() => {
    updateData();
  }, []);

  useInterval(updateData, 1000 * 60 * 60);

  return (
    <div>
      {ticks.length > 0 && (
        <Bar
          data={{
            labels: map(ticks, (item) => item[0]),
            datasets: [
              {
                label: "prix",
                data: map(ticks, (item) => item[1]),
                backgroundColor: map(ticks, () => "rgba(255, 99, 132, 0.2)"),
                borderColor: map(ticks, () => "rgba(255, 99, 132, 1)"),
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      )}
    </div>
  );
};

export default PriceGraph;
