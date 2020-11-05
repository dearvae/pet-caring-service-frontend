import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CarerNav from '../../../components/common/CarerNav'

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
