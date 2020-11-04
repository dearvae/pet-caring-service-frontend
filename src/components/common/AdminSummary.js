import React from 'react';
import {Link} from "react-router-dom";
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { flexbox } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// const router = useRouter();
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://localhost:5000/summary/total-petday-of-particular-month/2020/10')
  const {numberOfPets,petDay, salary } = await res.json();
  console.log(res);
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      numberOfPets,petDay, salary 
    }
  }
}
const Summary = (props) =>  {
  

  // componentWillMount(){
  //   this.setState({
  //     numberOfPets: this.props.numberOfPets,
  //     petDay: this.props.petDay,
  //     salary: this.props.salary
  //   })
  // }

    // var today = new Date();
    // var totalNumberOfPets = -1;
    // var totalNumberOfPetDay = -1;
    // var totalSalary = -1;
    // var currentYear = today.getFullYear();
    // var currentMonth = today.getMonth();
    // var jsonObjToSend = new Object();
    // jsonObjToSend.particularYear = currentYear;
    // jsonObjToSend.particularMonth = currentMonth;
    // var jsonToSend = JSON.stringify(jsonObjToSend);
    // console.log("json to send:" + jsonToSend);
  console.log(props);
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
                <p>{props.numberOfPets}</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <h5>Total number of pet days</h5>
                <p>{props.petDay}</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <h5>Total salary to be paid to all carer takers</h5>
                <p>{props.salary}</p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
}
// getData() {
//   fetch("http://localhost:5000/summary/total-petday-of-particular-month/2020/10", {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => {
//     console.log("response:" + response);
//     return response.json();
//   }
//   )
//   .then(result => {
//     console.log("result: " + result);
//     var numberofpetdays = JSON.parse(result).sum;
//     console.log("sum: " + numberofpetdays)
//     totalNumberOfPetDay = numberofpetdays;
//     console.log("totalNumberOfPetDay:" + totalNumberOfPetDay);
//     console.log("updating");
//     // var newStates = {
//     //   numberOfPets: totalNumberOfPets,
//     //   petDay: totalNumberOfPetDay,
//     //   salary: totalSalary
//     // };
//     // this.setState(newStates);
//     this.setState({
//       numberOfPets: totalNumberOfPets,
//       petDay : totalNumberOfPetDay,
//       salary : totalSalary
//     },
//     function() {
//       this.forceUpdate();
//       console.log("newpetday:" + this.state.petDay);
//       console.log("finish updateing");
//     }
//     );
//   })
//   .catch(error => {
//     console.log("Error: " + error);
//   });
// }


export default Summary
