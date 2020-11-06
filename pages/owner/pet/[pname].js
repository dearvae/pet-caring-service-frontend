import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CarerTable from '../../../src/components/carer/CarerTable';
import PetCard from '../../../src/components/pet/PetCard';

export async function getServerSideProps(context) {

    const  { pname } = context.params;

    return {
        props: {
            pname
        }
    }
  }

export default function petPage(props) {

    const [username, setUsername] = useState("");
    const [petInfo, setPetInfo] = useState({});
	const [carerList, setCarerList] = useState({});
	useEffect(() => {
		setUsername(localStorage.getItem('username'));
		fetch(process.env.API_PATH + `/pets/${username}/${props.pname}`)
		.then(res => res.json())
		.then(petInfo => {
			setPetInfo(petInfo);
        });
        fetch(process.env.API_PATH + `/carers/category/` + petInfo.category)
		.then(res => res.json())
		.then(carerList => {
			setCarerList(carerList);
        });	
	  });

    return (
        <div>
            <PetCard petInfo={petInfo} />
            <h1>{username}</h1>
            <CarerTable carerList={carerList}/>   
        </div>
    );
}
