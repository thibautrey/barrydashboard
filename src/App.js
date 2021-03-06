import React, { Fragment, useState } from "react";
import "./App.css";
import PriceGraph from "./PriceGraph";
import AddressCard from "./AddressCard";
import AggregatedData from "./AggregatedData";
import { Button, Input } from "@material-ui/core";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleToken = (e) => {
    setToken(e.target.value);
  };

  const submit = () => {
    localStorage.setItem("token", token);
    document.location.reload();
  };

  return (
    <Fragment>
      {token && (
        <div className="App">
          <PriceGraph />
          <AggregatedData />
          <AddressCard />
        </div>
      )}
      {!token && (
        <div className="TokenContainer">
          <Input value={token} onChange={handleToken} />
          <div>
            <Button onClick={submit}>Save</Button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default App;
