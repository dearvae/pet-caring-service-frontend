import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import OwnerNav from '../../../components/common/OwnerNav'
import Button from '@material-ui/core/Button'


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
      <OwnerNav />
      <Container className={classes.cardGrid} maxWidth="lg">
      <h1 style={{textAlign:'center'}}>Tutorial</h1>
      <Button color="primary">Change password</Button>
      <Button color="primary">Update Credit Card</Button>
 

      </Container>
    </div>
  )
}
