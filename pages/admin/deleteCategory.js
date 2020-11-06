import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AdminNav from '../../src/components/common/AdminNav'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(3),
    },
}))


export async function getServerSideProps({query: { category_name }}) {
    const url = process.env.API_PATH + '/categories/delete';
    return {
        props: {
            url, category_name
        }
    }
}


export default function DeleteCategory({category_name, url}) {
    const classes = useStyles();
    return (
    <div>
        <AdminNav/>
        <div style={{margin:300}}>
            <h3>Deleting Category</h3><br/>
            <form method="POST" action={url}>
                Category Name: <input type="text" name="category_name" value={category_name} readOnly></input><br/><br/>
                <input type="submit" value="Delete"></input>
            </form>
        </div>
    </div>
  );
}
