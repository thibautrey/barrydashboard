import React, { useCallback, useEffect, useState } from "react";
import { Bar } from "@reactchartjs/react-chart.js";
import { format, addDays } from "date-fns";
import { map, sortBy } from "lodash";
import useInterval from "@use-it/interval";
import { Button, Typography } from "@material-ui/core";

import { getTicks } from "../requests";
import "./PriceGraph.css";
import { useWindowSize } from "../utils";

const PriceGraph = () => {
  const [ticks, setTicks] = useState([]);
  const [daySubstract, setDaySubstract] = useState(0);
  const [loading, setLoading] = useState(true);
  const sizes = useWindowSize();

  const updateData = useCallback(() => {
    setLoading(true);
    getTicks({ daySubstract }).then((data) => {
      setTicks(
        sortBy(
          map(data, ({ start, end, value }) => [
            `${format(new Date(start), "HH")}-${format(new Date(end), "HH")}`,
            value,
          ]),
          (item) => item[0]
        )
      );
      setLoading(false);
    });
  }, [daySubstract]);

  const subOrAddDays = (action) => {
    if (action === "sub") {
      setDaySubstract(daySubstract - 1);
    } else if (action === "today") {
      setDaySubstract(0);
    } else {
      setDaySubstract(daySubstract + 1);
    }
  };

  useEffect(() => {
    updateData();
  }, [updateData]);

  useInterval(updateData, 1000 * 60 * 60);

  return (
    <div className="Graph">
      <div className="GraphTitle">
        <Typography variant="subtitle1">
          {daySubstract === 0 && "Today's price graph"}
          {daySubstract !== 0 &&
            `${format(
              addDays(new Date(), daySubstract),
              "dd/MM/yyyy"
            )} price graph`}
        </Typography>
        <div className="TitleButtons">
          <Button
            size={sizes.width > 1400 ? "medium" : "small"}
            variant="outlined"
            disabled={loading}
            onClick={subOrAddDays.bind(this, "sub")}
          >
            Previous Day
          </Button>
          <Button
            size={sizes.width > 1400 ? "medium" : "small"}
            variant="outlined"
            onClick={subOrAddDays.bind(this, "add")}
            disabled={daySubstract >= 1 || loading}
          >
            Next Day
          </Button>
          {daySubstract !== 0 && (
            <Button
              size={sizes.width > 1400 ? "medium" : "small"}
              variant="outlined"
              onClick={subOrAddDays.bind(this, "today")}
              disabled={loading}
            >
              Today
            </Button>
          )}
        </div>
      </div>
      {loading && (
        <Typography>API throttled, please wait for retry...</Typography>
      )}
      {ticks.length > 0 && !loading && (
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
