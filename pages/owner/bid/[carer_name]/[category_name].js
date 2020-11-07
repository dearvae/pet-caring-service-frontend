import React, { useState, useEffect } from 'react';
import moment from "moment";
import 'antd/dist/antd.css';
import makeStyles from '@material-ui/core/styles/makeStyles'
import OwnerNav from '../../../../src/components/common/OwnerNav';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
  } from 'antd';
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(3),
    },
  }))
  const { RangePicker } = DatePicker;
export async function getServerSideProps(context) {

    const  { carer_name, category_name } = context.params;

    return {
        props: {
            carer_name, category_name
        }
    }
  }

export default function BidPage(props) {
    const classes = useStyles()
    const [username, setUsername] = useState("");
    const [carerPrice, setCarerPrice] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [petList, setPetList] = useState([]);
    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        if (username != "") {
            fetch(process.env.NEXT_PUBLIC_API_PATH + `/pets/category/${username}/${props.category_name}`)
            .then(res => res.json())
            .then(petList => {
                setPetList(petList);
            })
        }
        fetch(process.env.NEXT_PUBLIC_API_PATH + `/carers/price/${props.carer_name}/${props.category_name}`)
        .then(res => res.json())
        .then(price => {
            setCarerPrice(price.carer_price);
        })
    });
    const rangeConfig = {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
      };
    const updatePrice = (time, timeString) => {
        const duration = time[1].diff(time[0],'days');
        console.log(duration);
        console.log(carerPrice);
        setCalculatedPrice(duration * carerPrice)
    }
      const onFinish = fieldsValue => {
        // Should format date value before submit.
        console.log(fieldsValue)
        const rangeValue = fieldsValue['range-picker'];
        const values = {
          'start_date': rangeValue[0].format('YYYY-MM-DD'),
          'end_date': rangeValue[1].format('YYYY-MM-DD'),
          'carer_name' : props.carer_name,
          'owner_name' : username,
          'pname' : fieldsValue['petname'],
          'bid_date' : moment().format("YYYY-MM-DD"),
          'payment_date' : moment().format("YYYY-MM-DD"),
          'payment_mode': fieldsValue['paymentMode'],
          'delivery_method' : fieldsValue['deliveryMethod'],
          'daily_price' : carerPrice,
        };
        console.log(values);
        fetch(process.env.NEXT_PUBLIC_API_PATH + `/bids/`,  
        {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)});
        }
    return (
        <div className={classes.root}>
            <Form  name="bid_form"
            labelCol={{ span: 4, }}  wrapperCol={{ span: 14,}} layout="horizontal" onFinish={onFinish}
      >
        <Form.Item label="Owner Name" id="owner_name" >
          <Input  disabled value={username}/>
        </Form.Item>

        <Form.Item label="Carer Name" id="carer_name" >
          <Input  disabled value={props.carer_name}/>
        </Form.Item>

        <Form.Item label="Category" id="category" >
          <Input  disabled value={props.category_name}/>
        </Form.Item>

        <Form.Item label="Pet" required="true" id="sas" name="petname">
          <Select >
            {petList.map((data, i) => <Select.Option value={data.pname}>{data.pname}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item label="Payment Method" required="true" id="sas" name="paymentMode">
          <Select >
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="credit card">Credit Card</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Delivery Method" required="true" id="sas" name="deliveryMethod">
          <Select >
            <Select.Option value="deliver to carer house">Deliver to carer house</Select.Option>
            <Select.Option value="carer pick up">Carer pick up at your house</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
            <RangePicker onChange={updatePrice}/>
        </Form.Item>
        <Form.Item label="Price (SGD)">
          <InputNumber disabled value={calculatedPrice}/>
        </Form.Item>
        <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
            <OwnerNav />
        </div>
        
    );
}