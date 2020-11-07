import React, { useState, useEffect, useCallback } from 'react';
import AddIcon from '@material-ui/icons/Add';
import 'antd/dist/antd.css';
import { Typography, Modal, Form, Input  } from 'antd';
import Fab from '@material-ui/core/Fab';
import PetTable from '../../../src/components/pet/PetTable';
import OwnerNav from '../../../src/components/common/OwnerNav';

import { makeStyles } from '@material-ui/core/styles';

const { Title } = Typography;

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(10),
		paddingBottom: theme.spacing(3)
	},
	title: {
		textAlign: 'center'
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(10),
		right: theme.spacing(10),
	  },
}));

export default function Home(props) {
	const classes = useStyles();
	const [username, setUsername] = useState("");
	const [petList, setPetList] = useState([]);
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();
	const showAddModal = () => {
        setVisible(true);
    };
	const closePopup = useCallback(() => {
        form.resetFields();
        setEditVisible(false);
      }, [form]);


      const onSubmit = useCallback((values) => {
		setVisible(false);
		console.log(values);
        const postMethod = {
            method: 'POST', // Method itself
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
				owner_name: localStorage.getItem('username'),
				pname: values.pname,
                requirements : values.requirements,
                belongs: values.belongs
            })  // We send data in JSON format
           }
           console.log( postMethod.body);
        const url = `${process.env.NEXT_PUBLIC_API_PATH}/pets/`;
        fetch(url, postMethod).then(window.location.reload());
        }, []);
	useEffect(() => {
		setUsername(localStorage.getItem('username'));
		fetch(`${process.env.NEXT_PUBLIC_API_PATH}/pets/${username}`)
		.then(res => res.json())
		.then(petList => {
			setPetList(petList);
		})	
	  }, []);
	return (
		<div className={classes.root}>
			<Modal
				title={"Add a new pet"}
				visible={visible}
				onOk={form.submit}
				okText="Add"
				onCancel={closePopup}
				>
					<Form
						form={form}
						onFinish={onSubmit}
					>
					<Form.Item label="Pet Name" name="pname">
					<Input />
					</Form.Item>
					<Form.Item label="Requirements" name="requirements">
					<Input />
					</Form.Item>
					<Form.Item label="Category" name="belongs">
					<Input />
					</Form.Item>
					</Form>
				</Modal>
			<Fab className={classes.fab} color="primary" aria-label="add" onClick={showAddModal}>
				<AddIcon />
			</Fab>
			<OwnerNav />
			<Title className={classes.title}>Pets List</Title>
			<PetTable petList={petList} />
		</div>
	);
}
