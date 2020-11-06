import React from 'react'
import { Card, Modal } from 'antd';
import 'antd/dist/antd.css';
import makeStyles from '@material-ui/core/styles/makeStyles'
import { AccountBookOutlined } from '@ant-design/icons';
import ReviewList from './ReviewList';
const { Meta } = Card;
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(3),
    },
  }))

  function bid() {
  }
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
const CarerDetailCard = (props) => {
  const classes = useStyles()
    const { info, reviewList } = props;
    const { carer_name, rating, is_fulltime, phone, area} = info;
  return (
    <div className={classes.root}>
    <Card
        actions={[
            <div><AccountBookOutlined onClick={bid} key="bid" /> Bid me!</div>
            ]}
        >
            <Card.Grid hoverable={false} style={gridStyle}> 
                {is_fulltime ? "Full time carer" : "Part time carer"} : {carer_name}
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}> 
                Rating: {rating}
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}> 
                Contact: {phone}
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}> 
                Area: {area}
            </Card.Grid>
            <Meta
            title="Carer Info"
            />
        </Card>
      <ReviewList reviewList={reviewList}/>
      </div>
  )
}

export default CarerDetailCard
