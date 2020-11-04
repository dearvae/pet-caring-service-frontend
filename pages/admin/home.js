// import adminHome from '../../src/views/admin/Home'

// export default adminHome

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container'
// import AdminNav from '../../../components/common/AdminNav'
// import AdminSummary from '../../../components/common/AdminSummary'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },
}))

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    
    const res = await fetch('http://localhost:5000/summary/total-petday-of-particular-month')
    const sum = await res.json();
    console.log(res);
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        sum
      }
    }
  }
  
export default function Home(props) {
  const classes = useStyles()


//   return (
//     <div>
//       {/* <AdminNav /> */}
//       <Container className={classes.cardGrid} maxWidth="lg">
//       <AdminSummary />
//       </Container>
//     </div>
//   )
return (
    <div>
      <div>
        <h2>Summary of the month</h2>
      </div>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={4} style={{background:'grey'}}>
            <div>
              <h5>Total number of pets taken care of</h5>
              <p>{props.sum}</p>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <h5>Total number of pet days</h5>
              <p>{props.sum}</p>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <h5>Total salary to be paid to all carer takers</h5>
              <p>{props.sum}</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
