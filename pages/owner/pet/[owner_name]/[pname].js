import { useRouter } from 'next/router';
import CarerTable from '../../../../src/components/carer/CarerTable';
import PetCard from '../../../../src/components/pet/PetCard';

export async function getServerSideProps(context) {

    const  { owner_name, pname } = context.params;
    let res = await fetch(process.env.API_PATH + `/pets/${owner_name}/${pname}` );
    const petInfo = await res.json();
    console.log(petInfo);
    const { belongs } = petInfo;
    // res = await fetch(process.env.API_PATH + '/carers/category/' + belongs);
    // const carerList = await res.json();
    // console.log(carerList);
    const carerList = {}

    return {
        props: {
            petInfo, carerList
        }
    }
  }

export default function carerDetail(props) {
    return (
        <div>
            <PetCard petInfo={props.petInfo} />
            {/* <CarerTable carerList={props.carerList}/>    */}
        </div>
    );
}
