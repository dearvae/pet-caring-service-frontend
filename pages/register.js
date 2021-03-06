import React, { useState } from 'react';

import Router from 'next/router'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import makeStyles  from '@material-ui/core/styles/makeStyles';
import MenuItem from '@material-ui/core/MenuItem';
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
    marginTop: 50,
    marginBottom: 50
  },
  input: {
    marginTop: 5,
    marginBottom: 5
  },
  button: {
    marginLeft: 5,
    marginRight: 5
  },
  accountType: {
    width: "100%",
    maxWidth: 200
  }
}));

export default function Login() {
  const classes = useStyles();
  const accountTypes = ['Admin', 'Owner', 'Carer'];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [accountType, setAccountType] = useState("Admin");
  const [carerType, setCarerType] = useState("Full-time");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const updatePassword = e => setPassword(e.target.value);
  const updateUsername = e => setUsername(e.target.value);
  const updateName = e => setName(e.target.value);
  const updatePhone = e => setPhone(e.target.value);
  const updateArea = e => setArea(e.target.value);
  const updateAddress = e => setAddress(e.target.value);
  const updateAccountType = e => setAccountType(e.target.value);
  const updateCarerType = e => setCarerType(e.target.value);

  const rerouteToLogin = () => Router.push('/login');
  const handleSuccess = res => {
    res.text().then(text => {
      setSuccessMsg(text);
      setShowSuccessDialog(true);
      setTimeout(rerouteToLogin, 3000);
    });
  };
  const displayError = res => res.text().then(text => {
    setErrorMsg(text);
    setShowErrorDialog(true);
  });

  const handleKeyPress = e => e.keyCode === 13 ? handleRegister() : '';
  const handleRegister = () => {
    const body = { username, password, name, phone, area, address }
    if (accountType === "Carer") {
      body.isFulltime = String(carerType === "Full-time")
    }
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/auth/register/${accountType}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.ok ? handleSuccess(res) : displayError(res));
  };
  const handleCloseErrorDialog = () => setShowErrorDialog(false);

  function SuccessDialog() {
    return (
      <Dialog open={showSuccessDialog}>
        <DialogTitle>{ successMsg }</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rerouting to login page in a few seconds
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
            Creating Your Account
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
          <TextField
            onChange={updatePassword}
            label="Password"
            type="password"
            variant="outlined"
            onKeyDown={handleKeyPress}
          />
        </Grid>
        <Grid container className={classes.input} justify="center">
          <TextField
            onChange={updateName}
            label="Name"
            type="text"
            variant="outlined"
            onKeyDown={handleKeyPress}
          />
          <TextField
            onChange={updatePhone}
            label="Phone"
            type="text"
            variant="outlined"
            onKeyDown={handleKeyPress}
          />
        </Grid>
        <Grid container className={classes.input} justify="center">
          <TextField
            onChange={updateArea}
            label="Area"
            type="text"
            variant="outlined"
            onKeyDown={handleKeyPress}
          />
          <TextField
            onChange={updateAddress}
            label="Address"
            type="text"
            variant="outlined"
            onKeyDown={handleKeyPress}
          />
        </Grid>
        <Grid container className={classes.input} justify="center">
          <TextField
            className={classes.accountType}
            select
            label="Account Type"
            value={accountType}
            onChange={updateAccountType}
            variant="outlined"
          >
            {accountTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {accountType !== "Carer" ? null :
          <TextField
            className={classes.accountType}
            select
            label="Carer Type"
            value={carerType}
            onChange={updateCarerType}
            variant="outlined"
          >
            {["Full-time", "Part-time"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>}
          <Grid container className={classes.input} justify="center">
            <Button className={classes.button} variant="contained" color="secondary" onClick={handleRegister}>
              Create Account
            </Button>
            <Button className={classes.button} variant="contained" color="secondary" onClick={rerouteToLogin}>
              Back To Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
