import React, { useState } from 'react';

import Router from 'next/router';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const AccountSelect = () => {
  const redirectAccountHome = userType => {
    Router.push(`/${userType}/home`);
    handleClose();
  }

  const [displayAccountSelect, setDisplayAccountSelect] = useState(false);

  const userTypes = JSON.parse(localStorage.getItem('userType'));
  const handleClose = () => setDisplayAccountSelect(false);
  const showAccountSelect = () => setDisplayAccountSelect(true);

  return (
    <span>
      <Dialog onClose={handleClose} open={displayAccountSelect}>
        <DialogTitle>Change Account Type</DialogTitle>
        <List>
          {userTypes.map((userType) => (
            <ListItem button onClick={() => redirectAccountHome(userType)} key={userType}>
              <ListItemText >
                <Typography align="center">
                  { userType }
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Button onClick={showAccountSelect}>
        Change Account
      </Button>
    </span>
  )
}

export default AccountSelect;
