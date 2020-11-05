import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AdminNav from '../../src/components/common/AdminNav'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

export default function AddCategory({categoryData}) {
    const classes = useStyles();
    const url = process.env.API_PATH + '/categories/';
    console.log(url);
    // const redirectToManage = () => {
    //     console.log("redirectin");
    //     window.location.href = "../admin/manageCategory";
    // }
    return (
    <div>
        <AdminNav/>
        <div style={{margin:300}}>
            <h3>Adding a New Category</h3><br/>
            <form method="POST" action={url}>
                Category Name: <input type="text" name="category_name"></input><br/><br/>
                Base Price: <input type="text" name="base_price"></input><br/><br/>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    </div>
  );
}
