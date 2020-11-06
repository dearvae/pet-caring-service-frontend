import React, { useEffect } from 'react';

import CarerNav from '../../../components/common/CarerNav';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },
}))

export default function Home() {

  const classes = useStyles()
  return (
    <div>
      <CarerNav />
      <Container className={classes.cardGrid} maxWidth="lg">
      
      </Container>
    </div>
  )
}
