import React, { useState, useEffect, useCallback } from 'react'
import 'antd/dist/antd.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import OwnerNav from '../../src/components/common/OwnerNav';
import { Card, Select, Modal, Form, Input, InputNumber, Button } from 'antd';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(10),
		paddingBottom: theme.spacing(3)
    },
    button: {
        marginLeft: theme.spacing(50),
    }
}));

export default function ProfileView(props) {
    const [form] = Form.useForm();
    const classes = useStyles();
    const [data, setData] = useState({});
    const onFinish = (values) => {
      console.log(values);
      const putMethod = {
        method: 'PUT', // Method itself
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            phone : values.phone,
            area : values.area,
            address: values.address
        })  // We send data in JSON format
       }
    const url = `${process.env.NEXT_PUBLIC_API_PATH}/owners/${localStorage.getItem('username')}`;
    fetch(url, putMethod).then(() => setTimeout(() => window.location.reload(), 3000));
    };
    useEffect(() => {
        let url = `${process.env.NEXT_PUBLIC_API_PATH}/owners/${localStorage.getItem('username')}`;
        fetch(url)
        .then(res => res.json())
		.then(data => {
            setData(data);
        });
    })
    return (
      <div>
        <OwnerNav />
        <div className={classes.root}>
              <Form  name="a"  
            labelCol={{ span: 4, }}  wrapperCol={{ span: 14,}} layout="horizontal" onFinish={onFinish}
        >
            <Form.Item  label="Name" id="owner_name" >
              <Input disabled value={data.owner_name}/>
            </Form.Item>
  
            <Form.Item label="Phone" name="phone" >
              <Input  placeholder={data.phone}/>
            </Form.Item>
  
            <Form.Item label="Area" name="area" >
              <Input  placeholder={data.area}/>
            </Form.Item>  

            <Form.Item label="Address" name="address" >
              <Input  placeholder={data.address}/>
            </Form.Item>  
  
            <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
            >
            <Button type="primary" htmlType="submit">
              Update my profile
            </Button>
            </Form.Item>
            </Form>
    
        </div>
      </div>
  
  );
  }
  

