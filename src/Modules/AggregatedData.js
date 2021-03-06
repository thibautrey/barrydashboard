import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import useInterval from "@use-it/interval";

import {
  getAggregatedDataCurrentMonth,
  getAggregatedDataCurrentWeek,
  getAggregatedDataLastMonth,
  getAggregatedDataLastWeek,
} from "../requests";
import { sumAggregate } from "../utils";
import "./AggregatedData.css";

const AggregatedData = () => {
  const [month, setMonth] = useState(0);
  const [week, setWeek] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [lastWeek, setLastWeek] = useState(0);

  const updateData = () => {
    getAggregatedDataCurrentMonth().then(sumAggregate).then(setMonth);
    getAggregatedDataCurrentWeek().then(sumAggregate).then(setWeek);
    getAggregatedDataLastMonth().then(sumAggregate).then(setLastMonth);
    getAggregatedDataLastWeek().then(sumAggregate).then(setLastWeek);
  };

  useEffect(() => {
    updateData();
  }, []);

  useInterval(updateData, 1000 * 60 * 60);

  return (
    <div className="Container">
      <Paper variant="outlined" className="Item">
        <Typography variant="h4">This month</Typography>
        <Typography variant="h5">{month}kwh</Typography>
      </Paper>
      <Paper variant="outlined" className="Item">
        <Typography variant="h4">This Week</Typography>
        <Typography variant="h5">{week}kwh</Typography>
      </Paper>
      <Paper variant="outlined" className="Item">
        <Typography variant="h4">Last month</Typography>
        <Typography variant="h5">{lastMonth}kwh</Typography>
      </Paper>
      <Paper variant="outlined" className="Item">
        <Typography variant="h4">Last week</Typography>
        <Typography variant="h5">{lastWeek}kwh</Typography>
      </Paper>
    </div>
  );
};

export default AggregatedData;
