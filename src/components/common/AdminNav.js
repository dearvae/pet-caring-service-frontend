import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography, Button } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import PublicIcon from '@material-ui/icons/Public'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { clearLocalStorage } from '../../auth'

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
  },
}))

const Nav = (props) => {
  const classes = useStyles()
  const router = useRouter()

  const redirectHome = (e) => {
    e.preventDefault()
    router.push('/')
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
            }}
          >
            Admin
          </Typography>
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
