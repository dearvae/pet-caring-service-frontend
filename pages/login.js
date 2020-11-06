import React, { useState } from 'react';

import Router from 'next/router';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import makeStyles  from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  header: {
    marginTop: 100,
    marginBottom: 100
  },
  input: {
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    marginLeft: 10,
    marginRight: 10
  }
}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const updatePassword = e => setPassword(e.target.value);
  const updateUsername = e => setUsername(e.target.value);

  const rerouteToRegister = () => Router.push('/register');
  const rerouteToHomePage = res => {
    res.json().then(json => {
      localStorage.setItem('userType', JSON.stringify(json.userType));
      localStorage.setItem('token', json.token);
      localStorage.setItem('username', json.username);
      setShowSuccessDialog(true);
      setTimeout(() => Router.push(`/${json.userType[0]}/home`), 3000);
    });
  };

  const displayError = res => res.text().then(text => {
    setErrorMsg(text);
    setShowErrorDialog(true);
  });
  const handleKeyPress = e => e.keyCode === 13 ? handleLogin() : '';
  const handleLogin = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.ok ? rerouteToHomePage(res) : displayError(res));
  }
  const handleCloseErrorDialog = () => setShowErrorDialog(false);

  function SuccessDialog() {
    return (
      <Dialog open={showSuccessDialog}>
        <DialogTitle>Login was successful!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rerouting to home page in a few seconds
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }

  function ErrorDialog() {
    return (
      <Dialog
        open={showErrorDialog}
        onClose={handleCloseErrorDialog}
      >
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
          { errorMsg }
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Grid container className={classes.root} style={{backgroundImage: 'url(/image/login.jpg)'}}>
      <SuccessDialog />
      <ErrorDialog />
      <Grid item xs={12} style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
        <Grid container className={classes.header} justify="center">
          <Typography variant="h1" component="h2" gutterBottom>
            Welcome to our website
          </Typography>
        </Grid>
        <Grid container className={classes.input} justify="center">
          <TextField
            onChange={updateUsername}
            label="Username"
            type="text"
            variant="outlined"
            onKeyDown={handleKeyPress}
          />
        </Grid>
        <Grid container className={classes.input} justify="center">
          <TextField
            onChange={updatePassword}
            label="Password"
            type="password"
            variant="outlined"
            onKeyDown={handleKeyPress}
          />
        </Grid>
        <Grid container justify="center">
          <Button className={classes.button} variant="contained" color="secondary" onClick={handleLogin}>
            Login
          </Button>
          <Button className={classes.button} variant="contained" color="secondary" onClick={rerouteToRegister}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
