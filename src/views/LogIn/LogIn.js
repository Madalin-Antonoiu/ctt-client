import React, { useEffect, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "../Dashboard/Navbar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        onespace.dev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LogIn = () => {
  const classes = useStyles();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const logInButton = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    logInButton.current.disabled = true;
  }, [emailInput, passwordInput]);

  const handleChange = () => {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    if (email && password) {
      logInButton.current.disabled = false;
    } else {
      logInButton.current.disabled = true;
    }
  };

  const loginUser = async (email, password) => {
    fetch("http://localhost:3000/login")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const logIn = (event) => {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    loginUser()
      .then(() => {
        <Redirect to="/home" />;
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Navbar />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>

        <form className={classes.form} noValidate onSubmit={logIn}>
          <TextField
            ref={emailInput}
            onChange={handleChange}
            id="email"
            label="Email Address"
            name="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="email"
            autoFocus
          />
          <TextField
            ref={passwordInput}
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="current-password"
          />

          {error ? (
            <Typography component="h1" variant="h5">
              The email and/or password seems to be incorrect. Please check it
              and try again.
            </Typography>
          ) : null}
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            ref={logInButton}
          >
            Log In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
