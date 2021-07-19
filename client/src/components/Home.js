import React from "react";
import Login from "../auth/Login";
import CloudQueue from "@material-ui/icons/CloudQueue";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Container, Link, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.light,
  },
  header: {
    margin: theme.spacing(2),
  },
}));

const Home = (props) => {
  const classes = useStyles();

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    props.history.push("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CloudQueue />
        </Avatar>
        <Typography variant="h4" className={classes.header}>
          Air Quality Control
        </Typography>
        <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      </div>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="/signup">
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
};

export default Home;
