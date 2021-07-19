import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const [details, setDetails] = useState({
    email: "",
    password: "",
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
    const { email, password } = details;
    let user = {
      email,
      password,
    };

    axios
      .post("http://localhost:3001/login", { user }, { withCredentials: true })
      .then(({ data }) => {
        if (data.logged_in) {
          props.handleSuccessfulAuth(data);
        } else {
          console.log("api errors: ", data.errors[0]);
        }
      })
      .catch((error) => console.log("api errors: ", error));
  };

  return (
    <Container>
      <Typography variant="h5">Sign in</Typography>
      <form className={classes.form} onSubmit={submitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login-email"
          label="Email Address"
          name="email"
          autoComplete="off"
          autoFocus
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
          id="login-password"
          autoComplete="current-password"
          onChange={handleChange}
          value={details.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
