import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Container,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import CloudQueue from "@material-ui/icons/CloudQueue";

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
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = (props) => {
  const classes = useStyles();

  const [details, setDetails] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { email, password, passwordConfirmation } = details;

    let user = {
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    axios
      .post("http://localhost:3001/users", { user }, { withCredentials: true })
      .then(({ data }) => {
        if (data.status === "created") {
          props.handleLogin(data);
          props.history.push("/dashboard");
        }
      })
      .catch((error) => console.log("api registration error: ", error));
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
        <Typography variant="h5">Sign Up</Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="signup-email"
            label="Email Address"
            name="email"
            onChange={handleChange}
            value={details.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="signup-password"
            onChange={handleChange}
            value={details.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            id="password-confirmation"
            onChange={handleChange}
            value={details.passwordConfirmation}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="/">
          Sign In
        </Link>
      </Typography>
    </Container>
  );
};

export default Signup;
