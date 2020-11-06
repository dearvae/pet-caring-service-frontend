import React from 'react';

import 'antd/dist/antd.css';
import { Carousel, Typography } from 'antd';

import CarerTable from '../../src/components/carer/CarerTable';
import OwnerNav from '../../src/components/common/OwnerNav';

import { makeStyles } from '@material-ui/core/styles';

const { Title } = Typography;

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(3),
    },
    title: {
        textAlign: 'center',
    }
}))


export async function getServerSideProps() {

    const res = await fetch(process.env.API_PATH + '/carers');
    const carerList = await res.json();
    console.log(carerList);
    
    return {
        props: {
            carerList,
        }
    }
  }
  
export default function Home(props) {
    const classes = useStyles()

    const contentStyle = {
        margin: '0 auto',
        maxWidth: '1200px',
        height: '500px',
        color: '#fff',
        lineHeight: '500px',
        textAlign: 'center',
        background: '#364d79',
    };
    if (typeof window !== 'undefined') {
        console.log(localStorage.getItem('username'));
    }
    return (
        
    <div className={classes.root}>
        <OwnerNav />
        <Title className={classes.title}>Welcome to Pet Caring Service System</Title>
        <Carousel autoplay>
            <div>
            <img src="/image/banner1.jpeg" style={contentStyle}></img>
            </div>
            <div>
            <img src="/image/banner2.jpg" style={contentStyle}></img>
            </div>
            <div>
            <img src="/image/banner3.jpg" style={contentStyle}></img>
            </div>
            <div>
            <img src="/image/banner4.png" style={contentStyle}></img>
            </div>
        </Carousel>
        <CarerTable carerList={props.carerList}/>
    </div>
  );
}
