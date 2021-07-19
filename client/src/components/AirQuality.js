import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  alert: {
    margin: theme.spacing(2),
  },
}));

const AirQuality = (props) => {
  const classes = useStyles();

  return (
    <Container align="center">
      <Typography variant="h2" align="center">
        Air Quality
      </Typography>
      {props.aqi > props.userAqi && (
        <Container maxWidth="sm">
          <Alert variant="filled" severity="error" className={classes.alert}>
            Warning AQI is Above Your Threshold
          </Alert>
        </Container>
      )}
      <Typography variant="h2" align="center">
        {props.aqi}
      </Typography>
    </Container>
  );
};

export default AirQuality;
