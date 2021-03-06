import { useRouter } from 'next/router';

import OwnerNav from '../../../src/components/common/OwnerNav';
import CarerDetailCard from '../../../src/components/carer/CarerDetailCard'

export async function getServerSideProps(context) {

    const  { carer_name } = context.params;
    let res = await fetch(process.env.API_PATH + '/carers/' + carer_name);
    const info = await res.json();
    res = await fetch(process.env.API_PATH + '/carers/reviews-by-rating/' + carer_name);
    const reviewList = await res.json();
    res = await fetch(process.env.API_PATH + '/carers/category-list/' + carer_name);
    const categoryList = await res.json();
    console.log(info);

    return {
        props: {
            info, reviewList, categoryList
        }
    }
  }

export default function carerDetail(props) {
    return (
        <div>
            <OwnerNav />
            <CarerDetailCard info={props.info} reviewList={props.reviewList} categoryList={props.categoryList}/>
        </div>
        
    );
}