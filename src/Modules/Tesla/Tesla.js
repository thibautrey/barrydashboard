import { useState } from "react";
import { Typography } from "@material-ui/core";

import "./Tesla.css";
import Menu from "./Menu";
import Car from "./Car";
import Schedule from "./Schedule";
import History from "./History";
import Settings from "./Settings";

const Tesla = () => {
  const [selectedMenu, setSelectedMenu] = useState("schedule");

  return (
    <div className="Tesla">
      <div className="Title">
        <img src="car.jpg" alt="car" />
        <Typography variant="h6">
          Tesla charge managment (NOT functionnal, fake data)
        </Typography>
      </div>
      <Menu {...{ selectedMenu, setSelectedMenu }} />
      {selectedMenu === "car" && <Car />}
      {selectedMenu === "schedule" && <Schedule />}
      {selectedMenu === "history" && <History />}
      {selectedMenu === "settings" && <Settings />}
    </div>
  );
};

export default Tesla;
