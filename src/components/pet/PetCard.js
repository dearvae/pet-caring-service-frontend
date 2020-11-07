import React, { useState, useCallback } from 'react';
import { Card, Modal, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import makeStyles from '@material-ui/core/styles/makeStyles'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Meta } = Card;
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(3),
    },
  }))
const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  const doubleGridStyle = {
    width: '50%',
    textAlign: 'center',
  };
  

const PetCard = (props) => {
    const router = useRouter();
    const classes = useStyles()
    const { petInfo } = props;
    const { pname, requirements, belongs } = petInfo;

    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setVisible(true);
    };

    const showEditModal = () => {
        setEditVisible(true);
    };
  
    const handleOk = e => {
         setVisible(false);
         const url = `${process.env.NEXT_PUBLIC_API_PATH}/pets/${localStorage.getItem('username')}/${pname}`;
         fetch(url,
            {method: 'DELETE'}).then(router.push('/owner/pet/pets'));
        
    };
  
    const handleCancel = e => {
        setVisible(false);
    };

    const closePopup = useCallback(() => {
        form.resetFields();
        setEditVisible(false);
      }, [form]);


      const onSubmit = useCallback((values) => {
        setEditVisible(false);
        const putMethod = {
            method: 'PUT', // Method itself
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                requirements : values.requirements,
                belongs: values.belongs
            })  // We send data in JSON format
           }
           console.log( putMethod.body);
        const url = `${process.env.NEXT_PUBLIC_API_PATH}/pets/${localStorage.getItem('username')}/${pname}`;
        fetch(url, putMethod).then(window.location.reload());
        }, []);

  return (
    <div className={classes.root}>
        <Modal
          title={"Delete pet " + pname}
          visible={visible}
          onOk={handleOk}
          okText="Delete"
          okType="danger"
          onCancel={handleCancel}
        >
            Are you sure you want to delete this pet?
        </Modal>
        <Modal
          title={"Edit pet " + pname}
          visible={editVisible}
          onOk={form.submit}
          okText="Confirm"
          onCancel={closePopup}
        >
            <Form
                form={form}
                onFinish={onSubmit}
            >
            <Form.Item label="Requirement" name="requirements">
            <Input placeholder={requirements} />
            </Form.Item>
            <Form.Item label="Category" name="belongs">
            <Input placeholder={belongs} />
            </Form.Item>
            </Form>
        </Modal>
        <Card
            style={{ maxWidth: 1200 }}
            actions={[
            <EditOutlined onClick={showEditModal} key="edit" />,
            <DeleteOutlined onClick={showModal} key="delete" />
            ]}
        >
            <Card.Grid hoverable={false} style={gridStyle}> 
                Name: {pname}
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
               Category: {belongs}
            </Card.Grid>
            <Card.Grid hoverable={false} style={doubleGridStyle}>
                Requirements: {requirements}
            </Card.Grid>

        </Card>
    </div>
    )
}

export default PetCard
