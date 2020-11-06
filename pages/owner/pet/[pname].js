import React, { useState, useEffect } from 'react';

import OwnerNav from '../../../src/components/common/OwnerNav';
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
    const [carerList, setCarerList] = useState([]);

	useEffect(() => {
        setUsername(localStorage.getItem('username'));
        const url = `${process.env.NEXT_PUBLIC_API_PATH}/pets/${username}/${props.pname}`;
        console.log(url);
		fetch(url)
		.then(res => {
            if(res.status == 200) {
                setPetInfo(res.json());
                console.log(petInfo);
                fetch(`${process.env.NEXT_PUBLIC_API_PATH}/carers/category/` + petInfo.belongs)
                .then(res => res.status == 200 ? res.json() : [])
                .then(carerList => {
                    setCarerList(carerList);
                });	
            } 
        });
      
        
	  }, []);
    
    return (
        <div>
            <OwnerNav />
            <PetCard petInfo={petInfo} />
            <CarerTable carerList={carerList}/>   
        </div>
    );
}
