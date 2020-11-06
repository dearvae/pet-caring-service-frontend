import React from 'react';

import Link from 'next/link';

import AdminNav from '../../src/components/common/AdminNav';

import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
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

export async function getServerSideProps() {
    var url = process.env.API_PATH + '/categories/';
    const result1 = await fetch(url);
    const result2 = await result1.json();
    const categoryData = JSON.parse(JSON.stringify(result2));
    return {
        props: {
            categoryData,
        }
    }
}

export default function ManageCategory({categoryData}) {
    const classes = useStyles()
    const deleteCategory = (category_name) => {
        console.log("entering method delete category");
        var url = process.env.API_PATH + '/categories/' + category_name;
        console.log(url);
        const res = fetch (url, {
            method: 'DELETE'
        }).then(res => {
            res.json();
        })
    };
    return (
    <div>
        <AdminNav />
        <h2>Edit Categories</h2>
        <TableContainer component={Paper} style={{width: 800, margin:'auto'}} >
        <Table className={classes.table}  size="medium" aria-label="simple table">
            <TableHead>
            <TableRow style={{backgroundColor:'#dddddd', fontWeight:1200}}>
                <TableCell>Category Name</TableCell>
                <TableCell align="right">Base Price</TableCell>
                <TableCell align="right">Function   <Link href="/admin/addCategory"><button>Add</button></Link></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {categoryData.map((category) => (
                <TableRow key={category.category_name}>
                <TableCell component="th" scope="row">
                    {category.category_name}
                </TableCell>
                <TableCell align="right">{category.base_price}</TableCell>
                <TableCell align="right"><Link href={`/admin/editCategory/?category_name=${category.category_name}`} passHref><button>Edit</button></Link> 
                <Link href={`/admin/deleteCategory/?category_name=${category.category_name}`} passHref><button>Delete</button></Link></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}
