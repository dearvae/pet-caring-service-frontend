import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import AdminNav from '../../src/components/common/AdminNav';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { unstable_renderSubtreeIntoContainer } from 'react-dom'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(3),
    },
}))



// export async function getServerSideProps() {
    
//     return {
//         props: {
//             categoryData,
//         }
//     }
// }

EditCategory.getInitialProps = ({query: { category_name }}) =>{
    // console.log(query);
    console.log("hhhh");
    console.log(category_name);
    return { category_name };
};

export default function EditCategory({category_name}) {
    const classes = useStyles();
    // const {
    //     query : {
    //         category_name
    //     },
    // } = useRouter();
    // console.log("haa");
    // console.log(category_name);
    const router = useRouter();
    const queryParams = router.query;
    // console.log( queryParams);
    // category_name = 'wanimal';
    console.log(category_name);
    // const { category_name } = queryParams;
    // console.log(category_name);
    // console.log(JSON.parse(JSON.stringify(queryParams)).category_name);
    const url = process.env.API_PATH + '/categories/edit';
    console.log(url);
    // const redirectToManage = () => {
    //     console.log("redirectin");
    //     window.location.href = "../admin/manageCategory";
    // }
    return (
    <div>
        <AdminNav/>
        <div style={{margin:300}}>
            <h3>Editing Category</h3><br/>
            <form method="POST" action={url}>
                Category Name: <input type="text" name="category_name" value={category_name} readOnly></input><br/><br/>
                Base Price: <input type="text" name="base_price"></input><br/><br/>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    </div>
  );
}
