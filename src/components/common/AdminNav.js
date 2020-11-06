import React, { useEffect, useState } from 'react';
import { authenticate } from '../../auth';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { clearLocalStorage } from '../../auth';
import AccountSelect from './AccountSelect';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PublicIcon from '@material-ui/icons/Public';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-label': {
      color: '#FFFFFF',
    },
  },
  toolbar: {
    minHeight: 50,
    backgroundColor: '#1A67F0'
  },
  icon: {
    color: '#FFFFFF',
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontWeight: 600,
  },
  button: {
    textTransform: 'uppercase',
    '&:focus': {
      outline: 'none',
    },
  }
}))

const Nav = (props) => {
  useEffect(() => authenticate(window.location.pathname), []);
  const classes = useStyles();
  const router = useRouter();

  const [renderAccountSelect, setRenderAccountSelect] = useState(false);
  useEffect(() => setRenderAccountSelect(true));

  const redirectHome = (e) => {
    e.preventDefault();
    router.push('/');
  }

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          className={classes.icon}
          edge="start"
          onClick={redirectHome}
        >
          <PublicIcon />
        </IconButton>
        <Typography className={classes.title}>
          Logged In As:{' '}
          <Typography
            variant="inherit"
            style={{
              padding: '4px',
              backgroundColor: '#ffff1a',
              color: 'black',
              borderRadius: '14px',
              userSelect: 'none'
            }}
          >
            Admin
          </Typography>
          {renderAccountSelect && <AccountSelect/>}
        </Typography>
        <Link href="/admin/manageCategory" passHref>
          <Button className={classes.button}>Manage Category</Button>
        </Link>
        <Link href="/admin/home" passHref>
          <Button className={classes.button}>Home</Button>
        </Link>
        <Link href="/admin/profile" passHref>
          <Button className={classes.button}>My Profile</Button>
        </Link>
        <Link href="/login">
          <Button className={classes.button} startIcon={<ExitToAppIcon />} onClick={clearLocalStorage}>
            Sign Out
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
