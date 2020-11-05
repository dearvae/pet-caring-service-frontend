import React from 'react';
import {Link} from "react-router-dom";
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { flexbox } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// const router = useRouter();

class CarerInfo extends React.Component {
  constructor(props) {
    super(props);a
    this.state = {
        review_rating: -1,
        review_content: -1
    };
    console.log("componentDidMount starting");
    var jsonObjToSend = new Object(); // should be carer's name, find out
    //how to get

    // jsonObjToSend.particularYear = currentYear;
    // jsonObjToSend.particularMonth = currentMonth;


    var jsonToSend = JSON.stringify(jsonObjToSend);
    // console.log("json to send:" + jsonToSend);
    fetch("http://localhost:5000/carer/reviews-by-date/:carer_name", {
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
    //   var numberofpetdays = JSON.parse(result).sum;
    //   console.log("sum: " + numberofpetdays)
    //   totalNumberOfPetDay = numberofpetdays;
    //   console.log("totalNumberOfPetDay:" + totalNumberOfPetDay);
    //   console.log("updating");
        var rating = JSON.parse(result).review_rating;
        var content = JSON.parse(result).review_content;

      // var newStates = {
      //   numberOfPets: totalNumberOfPets,
      //   petDay: totalNumberOfPetDay,
      //   salary: totalSalary
      // };
      // this.setState(newStates);
      this.setState({
        review_rating: rating,
        review_content : content,
      },
      function() {
        this.forceUpdate();
        // console.log("newpetday:" + this.state.petDay);
        // console.log("finish updateing");
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
          <h2>Carer Profile</h2>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={4} style={{background:'grey'}}>
              <div>
                <h5>Review Rating</h5>
                <p>{this.state.review_rating}</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <h5>Review Content</h5>
                <p>{this.state.review_content}</p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default CarerInfo
