import {
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import { addHours, format } from "date-fns";

import "./Schedule.css";

const Schedule = () => {
  return (
    <div className="Schedule">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timeframe</TableCell>
              <TableCell align="right">Price per Kwh</TableCell>
              <TableCell align="right">Estimated charge</TableCell>
              <TableCell align="right">Estimated cost</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{`${format(new Date(), "HH")}h - ${format(
                addHours(new Date(), 1),
                "HH"
              )}h`}</TableCell>
              <TableCell align="right">0.04567€</TableCell>
              <TableCell align="right">8.67 kwh</TableCell>{" "}
              <TableCell align="right">3.95€</TableCell>{" "}
              <TableCell align="right">
                <Button size="small" variant="outlined" color="secondary">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Schedule;
