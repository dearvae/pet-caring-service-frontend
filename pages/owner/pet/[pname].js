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

    const [petInfo, setPetInfo] = useState({});
    const [carerList, setCarerList] = useState([]);

	useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_API_PATH}/pets/${localStorage.getItem('username')}/${props.pname}`;
        console.log(url);
        fetch(url)
        .then(res => res.json())
		.then(info => {
                setPetInfo(info);
                fetch(`${process.env.NEXT_PUBLIC_API_PATH}/carers/category/` + info.belongs)
                .then(res => res.json())
                .then(carerList => {
                    setCarerList(carerList);
                });	
                console.log(carerList);
            }) 
    
	  }, []);

    return (
       
        <div>
            <OwnerNav />
            <PetCard petInfo={petInfo} />
            <CarerTable carerList={carerList}/>   
        </div>
    );
}
