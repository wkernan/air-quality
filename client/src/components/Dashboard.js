import React, { useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import UpdateUser from "./UpdateUser";
import AirQuality from "./AirQuality";

const useStyles = makeStyles((theme) => ({
  dataText: {
    marginTop: theme.spacing(2),
  },
  location: {
    marginBottom: theme.spacing(4),
  },
  root: {
    flexGrow: 1,
  },
  welcome: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(4),
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();

  const [aqi, setAqi] = useState(0);

  const handleAqi = (data) => {
    setAqi(data.aqi);
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Typography
            variant="h6"
            color="textSecondary"
            className={classes.root}
          >
            {props.details.user.email}
          </Typography>
          <Button color="inherit" href="/" onClick={props.handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main">
        <div className={classes.welcome}>
          <Container maxWidth="sm" className={classes.dataText}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h5">
                  Current City: {props.details.user.city}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">
                  Current Threshold: {props.details.user.air_quality_threshold}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className={classes.location}>
          <UpdateUser
            user={props.details.user}
            handleAqi={handleAqi}
            handleUpdate={props.handleUpdate}
          />
        </div>
        <AirQuality
          aqi={aqi}
          userAqi={props.details.user.air_quality_threshold}
        />
      </Container>
    </div>
  );
};

export default Dashboard;
