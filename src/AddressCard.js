import { Card, CardContent, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

import "./AddressCard.css";
import { getMeteringPoint } from "./requests";

const AddressCard = () => {
  const [meteringPoint, setMeteringPoint] = useState([]);

  useEffect(() => {
    getMeteringPoint().then(setMeteringPoint);
  }, []);

  return (
    <div className="AddressCard">
      {meteringPoint && (
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {meteringPoint.line1}
            </Typography>
            <Typography variant="h5" component="h2">
              {meteringPoint.line2}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddressCard;
