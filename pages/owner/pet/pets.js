import React, { useState, useEffect } from 'react';

import 'antd/dist/antd.css';
import { Typography } from 'antd';

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
	}
}));

export default function Home(props) {
	const classes = useStyles();
	const [username, setUsername] = useState("");
	const [petList, setPetList] = useState([]);
	useEffect(() => {
		setUsername(localStorage.getItem('username'));
		fetch(`${process.env.NEXT_PUBLIC_API_PATH}/pets/${username}`)
		.then(res => res.json())
		.then(petList => {
			setPetList(petList);
		})	
	  });
	return (
		<div className={classes.root}>
			<OwnerNav />
			<Title className={classes.title}>Pets List</Title>
			<PetTable petList={petList} />
		</div>
	);
}
