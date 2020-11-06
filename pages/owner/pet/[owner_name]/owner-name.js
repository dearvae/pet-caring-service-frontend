import React from 'react';

import 'antd/dist/antd.css';
import { Typography } from 'antd';

import PetTable from '../../src/components/pet/PetTable';
import OwnerNav from '../../src/components/common/OwnerNav';

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

export async function getServerSideProps(context) {
	const { owner_name } = context.params;
	const res = await fetch(process.env.API_PATH + `/pets/${owner_name}/`);
	const petList = await res.json();
	console.log(petList);

	return {
		props: {
			petList
		}
	};
}

export default function Home(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<OwnerNav />
			<Title className={classes.title}>Pets List</Title>
			<PetTable petList={props.petList} />
		</div>
	);
}
