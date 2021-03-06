import {
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { subDays, format, startOfDay, endOfDay } from "date-fns";

const History = () => {
  return (
    <div className="History">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Average price per Kwh</TableCell>
              <TableCell align="right">Charged</TableCell>
              <TableCell align="right">Estimated cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{`${format(
                subDays(new Date(), 1),
                "do LLL yyyy"
              )} (${format(
                startOfDay(subDays(new Date(), 1)),
                "HH"
              )}h - ${format(
                endOfDay(subDays(new Date(), 1)),
                "HH"
              )}h)`}</TableCell>
              <TableCell align="right">0.04567€</TableCell>
              <TableCell align="right">8.67 kwh</TableCell>{" "}
              <TableCell align="right">3.95€</TableCell>{" "}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default History;
