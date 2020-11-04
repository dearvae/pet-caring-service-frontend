import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container'
import AdminNav from '../../src/components/common/AdminNav'
// import AdminSummary from '../../src/components/common/AdminSummary'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(3),
    },
}))

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    var url = 'http://localhost:5000/summary/total-petday-of-particular-month/' + year + '/' + month;
    const res = await fetch(url);
    const sum = await res.json();
    const numpetdays = JSON.parse(sum).sum;
    console.log(res);

    var url2 = 'http://localhost:5000/summary/num-pets/' + year + '/' + month;
    console.log(url2);
    const res2 = await fetch(url2);
    console.log("res2");
    console.log(res2);
    const numpetsobj = await res2.json();
    const numpets = JSON.parse(JSON.stringify(numpetsobj)).count;
    console.log(numpetdays + " : " + numpets);

    var summaryData = {petdays: numpetdays, pets: numpets};

    // var url3 = '"http://lo/salary/:month/:year/:carer_name"'



    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            summaryData,
        }
    }
  }
  
export default function Home(props) {
    const classes = useStyles()


//   return (
//     <div>
      {/* <AdminNav /> */}
//       <Container className={classes.cardGrid} maxWidth="lg">
//       <AdminSummary />
//       </Container>
//     </div>
//   )
    return (
    <div>
        <AdminNav />
        <div>
            <h2>Summary of the month</h2>
        </div>
        <div>
            <Grid container spacing={3}>
            <Grid item xs={4}>
                <div>
                <h5>Total number of pets taken care of</h5>
                <p>{props.summaryData.pets}</p>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div>
                <h5>Total number of pet days</h5>
                <p>{props.summaryData.petdays}</p>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div>
                <h5>Total salary to be paid to all carer takers</h5>
                <p>{props.summaryData.sum}</p>
                </div>
            </Grid>
            </Grid>
        </div>
    </div>
  );
}
