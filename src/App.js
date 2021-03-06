import React, { Fragment, useState } from "react";
import { Button, Input, Typography } from "@material-ui/core";
import { map } from "lodash";

import "./App.css";
import PriceGraph from "./Modules/PriceGraph";
import AddressCard from "./Modules/AddressCard";
import AggregatedData from "./Modules/AggregatedData";

const defaultDashboardModules = [
  "PriceGraph",
  "Aggregated",
  "Address",
  "Tesla",
];

function App() {
  const [token, setToken] = useState("");
  const [tokenFound] = useState(localStorage.getItem("token"));
  const [dashboardModules, setDashboardModules] = useState(
    localStorage.getItem("dashboardModules") || defaultDashboardModules
  );

  const handleToken = (e) => {
    setToken(e.target.value);
  };

  const submit = () => {
    localStorage.setItem("token", token);
    document.location.reload();
  };

  return (
    <Fragment>
      {tokenFound && (
        <div className="App">
          {map(
            map(dashboardModules, (type) => {
              switch (type) {
                case "PriceGraph":
                  return <PriceGraph />;
                case "Aggregated":
                  return <AggregatedData />;
                case "Tesla":
                  break;
                case "Address":
                  return <AddressCard />;
                default:
                  return null;
              }
            }),
            (children, key) => (
              <div className="item" {...{ key }}>
                {children}
              </div>
            )
          )}
        </div>
      )}
      {!tokenFound && (
        <div className="TokenContainer">
          <Typography variant="h5">Insert your Barry token below</Typography>
          <div className="body">
            <Input value={token} onChange={handleToken} />
            <Button onClick={submit}>Save</Button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default App;
