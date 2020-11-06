import React from 'react';

import AdminNav from '../../../components/common/AdminNav';
import { authenticate } from '../../src/auth';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },
}))

export default function Profile() {
  if (typeof window !== "undefined") {
    authenticate(window.location.pathname);
  }
  const classes = useStyles()


  return (
    <div>
      <AdminNav />
      <Container className={classes.cardGrid} maxWidth="lg">
 
      </Container>
    </div>
  )
}
