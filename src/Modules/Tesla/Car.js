import { Button } from "@material-ui/core";
import { useState } from "react";

import Battery from "./Battery";
import "./Car.css";
import { useWindowSize } from "../../utils";

const Car = () => {
  const [level] = useState(0.8);
  const [charging, setCharging] = useState(false);
  const sizes = useWindowSize();

  return (
    <div className="Car">
      <div className="actions">
        <Button
          variant="outlined"
          disabled={charging}
          onClick={setCharging.bind(this, true)}
        >
          Start Charge
        </Button>
        <Button
          variant="outlined"
          disabled={!charging}
          onClick={setCharging.bind(this, false)}
        >
          Stop Charge
        </Button>
      </div>
      {sizes.width > 1400 && (
        <div className="carImage">
          <img src="carTopView.png" alt="car" />
        </div>
      )}
      <div className="status">
        <Battery {...{ level, charging }} />
      </div>
    </div>
  );
};

export default Car;
