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

  const isAboveThreshold = () => {
    return props.aqi > props.userAqi;
  };

  const alertSeverity = () => {
    return isAboveThreshold()
      ? { severity: "error", message: "AQI is Above Your Threshold" }
      : { severity: "success", message: "AQI is at or Below Your Threshold" };
  };

  return (
    <Container align="center">
      <Typography variant="h2" align="center">
        Air Quality
      </Typography>
      <Container maxWidth="sm">
        <Alert
          variant="filled"
          severity={alertSeverity().severity}
          className={classes.alert}
        >
          {alertSeverity().message}
        </Alert>
      </Container>
      <Typography variant="h2" align="center">
        {props.aqi}
      </Typography>
    </Container>
  );
};

export default AirQuality;
