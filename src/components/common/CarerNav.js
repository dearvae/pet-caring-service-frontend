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

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-label': {
      color: '#FFFFFF',
    },
  },
  toolbar: {
    minHeight: 50,
    backgroundColor: theme.palette.primary.main,
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
              backgroundColor: '#F3D0D4',
              color: 'black',
              borderRadius: '14px',
            }}
          >
            Carer
          </Typography>
        </Typography>
        <Link href="/carer/home" passHref>
          <Button className={classes.button}>Home</Button>
        </Link>
        <Link href="/carer/profile" passHref>
          <Button className={classes.button}>My Profile</Button>
        </Link>
        <Link href="/">
          <Button className={classes.button} startIcon={<ExitToAppIcon />}>
            Sign Out
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
