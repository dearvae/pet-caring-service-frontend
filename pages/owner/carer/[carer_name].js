import { useRouter } from 'next/router';

import { authenticate } from '../../src/auth'
import CarerDetailCard from '../../../src/components/carer/CarerDetailCard'

export async function getServerSideProps(context) {

    const  { carer_name } = context.params;
    let res = await fetch(process.env.API_PATH + '/carers/' + carer_name);
    const info = await res.json();
    res = await fetch(process.env.API_PATH + '/carers/reviews-by-rating/' + carer_name);
    const reviewList = await res.json();
    console.log(info);

    return {
        props: {
            info, reviewList
        }
    }
  }

export default function carerDetail(props) {
    if (typeof window !== "undefined") {
        authenticate(window.location.pathname);
    }
 
    return (
        <CarerDetailCard info={props.info} reviewList={props.reviewList}/>
    );
}