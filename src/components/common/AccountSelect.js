import React, { useState } from 'react';

import Router from 'next/router';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const AccountSelect = () => {
  const redirectAccountHome = userType => {
    Router.push(`/${userType}/home`);
    handleCloseAccountSelect();
  }

  const [displayAccountSelect, setDisplayAccountSelect] = useState(false);
  const [displayAccountCreate, setDisplayAccountCreate] = useState(false);

  const userTypes = JSON.parse(localStorage.getItem('userType'));
  let accountsToCreate = ['owner', 'carer'].filter(type => !userTypes.includes(type));
  if (accountsToCreate.includes('carer')) {
    accountsToCreate = accountsToCreate.filter(x => x !== 'carer');
    accountsToCreate.push('full-time carer', 'part-time carer');
  }
  const handleCloseAccountSelect = () => setDisplayAccountSelect(false);
  const handleCloseAccountCreate = () => setDisplayAccountCreate(false);
  const showAccountSelect = () => setDisplayAccountSelect(true);
  const showAccountCreate = () => {
    handleCloseAccountSelect();
    setDisplayAccountCreate(true);
  }

  const createNewAccountType = userType => {
    handleCloseAccountCreate();
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/auth/add-account-type/${localStorage.getItem('username')}/${userType.replaceAll(' ', '-')}`)
    .then(res => {
      if (res.ok) {
        res.json().then(json => {
          const { userType } = json;
          localStorage.setItem('userType', JSON.stringify(userType));
          window.location.reload();
        })
      }
    })
  }

  return (
    <span>
      <Dialog onClose={handleCloseAccountSelect} open={displayAccountSelect}>
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
          {accountsToCreate.length === 0 ||
          <div>
            <Divider/>
            <ListItem autoFocus button onClick={showAccountCreate}>
              <ListItemText >
                  <Typography align="center">
                    Add new account type
                  </Typography>
              </ListItemText>
            </ListItem>
          </div>
          }
        </List>
      </Dialog>
      <Dialog onClose={handleCloseAccountCreate} open={displayAccountCreate}>
        <DialogTitle>Choose A New Account Type</DialogTitle>
        <List>
          {accountsToCreate.map((userType) => (
            <ListItem button onClick={() => createNewAccountType(userType)} key={userType}>
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
