import { Button } from "@material-ui/core";

import { useWindowSize } from "../../utils";

const Menu = ({ selectedMenu, setSelectedMenu }) => {
  const sizes = useWindowSize();

  return (
    <div className="ButtonsContainer">
      <Button
        size={sizes.width > 1400 ? "medium" : "small"}
        variant="outlined"
        disabled={selectedMenu === "schedule"}
        onClick={setSelectedMenu.bind(this, "schedule")}
      >
        Schedule
      </Button>
      <Button
        size={sizes.width > 1400 ? "medium" : "small"}
        variant="outlined"
        disabled={selectedMenu === "history"}
        onClick={setSelectedMenu.bind(this, "history")}
      >
        History
      </Button>
      <Button
        size={sizes.width > 1400 ? "medium" : "small"}
        variant="outlined"
        disabled={selectedMenu === "car"}
        onClick={setSelectedMenu.bind(this, "car")}
      >
        Manage Vehicule
      </Button>
      <Button
        size={sizes.width > 1400 ? "medium" : "small"}
        variant="outlined"
        disabled={selectedMenu === "settings"}
        onClick={setSelectedMenu.bind(this, "settings")}
      >
        Charge Settings
      </Button>
    </div>
  );
};

export default Menu;
