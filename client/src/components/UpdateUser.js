import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));

const UpdateUser = (props) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    city: "",
    aqiThreshold: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .all([
        axios.put(
          `http://localhost:3001/users/${props.user.id}`,
          { city: formData.city, air_quality_threshold: formData.aqiThreshold },
          { withCredentials: true }
        ),
        axios.get(
          `https://api.waqi.info/feed/${formData.city.toLowerCase()}/?token=${
            process.env.REACT_APP_AQ_API_TOKEN
          }`
        ),
      ])
      .then(
        axios.spread((userResult, { data }) => {
          props.handleUpdate(userResult.data);
          props.handleAqi(data.data);
        })
      );
  };

  useEffect(() => {
    const getAqi = async () => {
      const res = await axios.get(
        `https://api.waqi.info/feed/${props.user.city.toLowerCase()}/?token=e464f45dcd14f7dc691dfb1f31c901158ca8445f`
      );
      return await res;
    };
    if (props.user.city) {
      getAqi().then(({ data }) => {
        props.handleAqi(data.data);
      });
      setFormData({
        city: props.user.city,
        aqiThreshold: props.user.air_quality_threshold,
      });
    }
  }, [props]);

  return (
    <Container maxWidth="sm" align="center">
      <form className={classes.form} onSubmit={submitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="city"
          label="Enter City"
          name="city"
          autoFocus
          required
          onChange={handleChange}
          value={formData.city}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="aqi-threshold"
          label="Enter AQI Threshold"
          name="aqiThreshold"
          onChange={handleChange}
          value={formData.aqiThreshold}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default UpdateUser;
