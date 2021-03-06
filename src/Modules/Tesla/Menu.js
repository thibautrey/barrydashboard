import { Button } from "@material-ui/core";

const Menu = ({ selectedMenu, setSelectedMenu }) => {
  return (
    <div className="ButtonsContainer">
      <Button
        variant="contained"
        color="primary"
        disabled={selectedMenu === "schedule"}
        onClick={setSelectedMenu.bind(this, "schedule")}
      >
        Schedule
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={selectedMenu === "history"}
        onClick={setSelectedMenu.bind(this, "history")}
      >
        History
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={selectedMenu === "car"}
        onClick={setSelectedMenu.bind(this, "car")}
      >
        Manage Vehicule
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={selectedMenu === "settings"}
        onClick={setSelectedMenu.bind(this, "settings")}
      >
        Charge Settings
      </Button>
    </div>
  );
};

export default Menu;
