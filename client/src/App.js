import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Signup from "./auth/Signup";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
  const theme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const [details, setDetails] = useState({
    loginStatus: "NOT_LOGGED_IN",
    isLoggedIn: false,
    user: {
      city: "",
      apiThreshold: "",
    },
  });

  const handleLogin = (data) => {
    setDetails({
      loginStatus: "LOGGED_IN",
      isLoggedIn: true,
      user: data.user,
    });
  };

  const handleLogout = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(() => {
        setDetails({
          loginStatus: "NOT_LOGGED_IN",
          isLoggedIn: false,
          user: {},
        });
      });
  };

  const handleUpdate = (data) => {
    setDetails({
      user: data.user,
    });
  };

  useEffect(() => {
    const loginStatus = () => {
      axios
        .get("http://localhost:3001/logged_in", { withCredentials: true })
        .then(({ data }) => {
          if (data.logged_in) {
            setDetails({
              loginStatus: "LOGGED_IN",
              isLoggedIn: true,
              user: data.user,
            });
          } else {
            setDetails({
              loginStatus: "NOT_LOGGED_IN",
              isLoggedIn: false,
              user: {},
            });
          }
        })
        .catch((error) => console.log("api errors:", error));
    };

    loginStatus();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home {...props} details={details} handleLogin={handleLogin} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup {...props} details={details} handleLogin={handleLogin} />
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <Dashboard
                {...props}
                details={details}
                handleLogout={handleLogout}
                handleUpdate={handleUpdate}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
