import React from 'react';
import {Link} from "react-router-dom";
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { flexbox } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// const router = useRouter();

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPets: -1,
      petDay: -1,
      salary: -1
    };
    console.log("componentDidMount starting");
    var today = new Date();
    var totalNumberOfPets = -1;
    var totalNumberOfPetDay = -1;
    var totalSalary = -1;
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth();
    var jsonObjToSend = new Object();
    jsonObjToSend.particularYear = currentYear;
    jsonObjToSend.particularMonth = currentMonth;
    var jsonToSend = JSON.stringify(jsonObjToSend);
    console.log("json to send:" + jsonToSend);
    fetch("http://localhost:5000/summary/total-petday-of-particular-month", {
      method: 'POST',
      body: jsonToSend,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log("response:" + response);
      return response.json();
    }
    )
    .then(result => {
      console.log("result: " + result);
      var numberofpetdays = JSON.parse(result).sum;
      console.log("sum: " + numberofpetdays)
      totalNumberOfPetDay = numberofpetdays;
      console.log("totalNumberOfPetDay:" + totalNumberOfPetDay);
      console.log("updating");
      // var newStates = {
      //   numberOfPets: totalNumberOfPets,
      //   petDay: totalNumberOfPetDay,
      //   salary: totalSalary
      // };
      // this.setState(newStates);
      this.setState({
        numberOfPets: totalNumberOfPets,
        petDay : totalNumberOfPetDay,
        salary : totalSalary
      },
      function() {
        this.forceUpdate();
        console.log("newpetday:" + this.state.petDay);
        console.log("finish updateing");
      }
      );
    })
    .catch(error => {
      console.log("Error: " + error);
    });
  }

  componentDidMount() {

  }

  render() {
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
                <p>{this.state.numberOfPets}</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <h5>Total number of pet days</h5>
                <p>{this.state.petDay}</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <h5>Total salary to be paid to all carer takers</h5>
                <p>{this.state.salary}</p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Summary
