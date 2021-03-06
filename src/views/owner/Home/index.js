import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import OwnerNav from '../../../components/common/OwnerNav'

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
      <OwnerNav />  
      <Container className={classes.cardGrid} maxWidth="lg">
 
      </Container>
    </div>
  )
}
