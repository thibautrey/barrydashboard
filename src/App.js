import React from "react";
import "./App.css";
import PriceGraph from "./PriceGraph";
import AddressCard from "./AddressCard";
import AggregatedData from "./AggregatedData";
import { useFullScreen } from "react-hooks-full-screen";

function App() {
  return (
    <div className="App">
      <PriceGraph />
      <AggregatedData />
      <AddressCard />
    </div>
  );
}

export default App;
