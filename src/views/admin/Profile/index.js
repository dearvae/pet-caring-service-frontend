import React from 'react';

import AdminNav from '../../../components/common/AdminNav';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },
}))

export default function Profile() {
  const classes = useStyles()


  return (
    <div>
      <AdminNav />
      <Container className={classes.cardGrid} maxWidth="lg">
 
      </Container>
    </div>
  )
}
