import React, { useState, useEffect, useCallback } from 'react'
import 'antd/dist/antd.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CarerNav from '../../src/components/common/CarerNav';
import { Card, Select, Modal, Form, Input, InputNumber, Button } from 'antd';
import CategoryList from '../../src/components/carer/CategoryList';

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
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
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
    const url = `${process.env.NEXT_PUBLIC_API_PATH}/carers/${localStorage.getItem('username')}`;
    fetch(url, putMethod).then(window.location.reload());
    };
    const showModal = () => {
        setVisible(true);
    };
    const closePopup = useCallback(() => {
        form.resetFields();
        setVisible(false);
      }, [form]);


      const onSubmit = useCallback((values) => {

        setVisible(false);
        const postMethod = {
            method: 'POST', // Method itself
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                category_name : values.category_name,
            })  // We send data in JSON format
           }
        const url = `${process.env.NEXT_PUBLIC_API_PATH}/carers/add-category/${localStorage.getItem('username')}`;
        fetch(url, postMethod).then(window.location.reload());
        }, []);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_PATH}/categories/`)
        .then(res => res.json())
        .then(allCategory => {
            setAllCategory(allCategory);
        })
        let url = `${process.env.NEXT_PUBLIC_API_PATH}/carers/${localStorage.getItem('username')}`;
        fetch(url)
        .then(res => res.json())
		.then(data => {
            setData(data);
            fetch(`${process.env.NEXT_PUBLIC_API_PATH}/carers/category-list/${localStorage.getItem('username')}`)
            .then(res => res.json())
            .then(list => {
                setCategoryList(list);
                }) 
            }) 
	  });
    return (
      <div>
        <CarerNav />
        <div className={classes.root}>
        <Modal
          title={"Add a category"}
          visible={visible}
          onOk={form.submit}
          okText="Add"
          onCancel={closePopup}
        >
            <Form
                form={form}
                onFinish={onSubmit}
            >

            <Form.Item label="Category" required="true" id="sacategory_names" name="category_name">
            <Select >
                { allCategory.map((data, i) => <Select.Option value={data.category_name}>{data.category_name}</Select.Option>)}
            </Select>
            </Form.Item>
            </Form>
        </Modal>
              <Form  name="a"  
            labelCol={{ span: 4, }}  wrapperCol={{ span: 14,}} layout="horizontal" onFinish={onFinish}
        >
            <Form.Item  label="Name" id="carer_name" >
              <Input disabled value={data.carer_name}/>
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
        <Button type="primary" onClick={showModal} className={classes.button}> Add a Category </Button>
        < CategoryList categoryList={categoryList} />
      </div>
  
  );
  }
  

