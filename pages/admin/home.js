import React from 'react'
import { authenticate } from '../../src/auth'
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

export async function getServerSideProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    console.log(process.env.API_PATH );
    var url = process.env.API_PATH + '/summary/total-petday-of-particular-month/' + year + '/' + month;
    const res = await fetch(url);
    const sum = await res.json();
    const numpetdays = JSON.parse(sum).sum;
    console.log(res);

    var url2 = process.env.API_PATH + '/summary/num-pets/' + year + '/' + month;
    console.log(url2);
    const res2 = await fetch(url2);
    console.log("res2");
    console.log(res2);
    const numpetsobj = await res2.json();
    const numpets = JSON.parse(JSON.stringify(numpetsobj)).count;
    console.log(numpetdays + " : " + numpets);

    var url3 = process.env.API_PATH + '/summary/carernum';
    const res3 = await fetch(url3);
    const carernumobj = await res3.json();
    const carernum = JSON.parse(JSON.stringify(carernumobj)).count;

    var url4 = process.env.API_PATH + '/summary/ownernum';
    const res4 = await fetch(url4);
    const ownernumobj = await res4.json();
    const ownernum = JSON.parse(JSON.stringify(ownernumobj)).count;

    var url5 = process.env.API_PATH + '/summary/totalSalary/' + month + '/' + year;
    const res5 = await fetch(url5);
    const salaryobj = await res5.json();
    const salary = JSON.parse(JSON.stringify(salaryobj)).salary;
    var summaryData = {petdays: numpetdays, pets: numpets, owners:ownernum, carers: carernum, salary: salary};

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
    if (typeof window !== "undefined") {
        authenticate(window.location.pathname);
    }
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
        <div style={{margin:40}}>
            <Grid container spacing={3} style={{padding:40, marginRight:40, backgroundColor:'#dddddd'}}>
            <Grid item xs={4} style={{borderRight:'1px solid white'}}>
                <div>
                <h5>{props.summaryData.pets}</h5>
                <p>pets taken care of in this month</p>
                </div>
            </Grid>
            <Grid item xs={4} style={{borderRight:'1px solid white'}}>
                <div>
                <h5>{props.summaryData.petdays}</h5>
                <p>petdays in this month</p>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div>
                <h5>${props.summaryData.salary}</h5>
                <p>paid to all carers in this month</p>
                </div>
            </Grid>
            </Grid>
            <Grid container spacing={3} style={{padding:40, marginRight:40, border:'1px solid white', backgroundColor:'#dddddd'}}>
            <Grid item xs={4} style={{borderRight:'1px solid white'}}>
                <div>
                <h5>{props.summaryData.carers}</h5>
                <p>carers are caring for pets</p>
                </div>
            </Grid>
            <Grid item xs={4}style={{borderRight:'1px solid white'}}>
                <div>
                <h5>{props.summaryData.owners}</h5>
                <p>owners are taking care of their pets in our platform</p>
                </div>
            </Grid>
            <Grid item xs={4}>
                <div>
                <h5>{parseInt(props.summaryData.owners) + parseInt(props.summaryData.carers)}</h5>
                <p>users in our platform</p>
                </div>
            </Grid>
            </Grid>
        </div>
    </div>
  );
}
