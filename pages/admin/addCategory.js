import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AdminNav from '../../src/components/common/AdminNav'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(3),
    },
}))


export async function getServerSideProps() {
    const url = process.env.API_PATH + '/categories/';
    return {
        props: {
            url,
        }
    }
}

export default function AddCategory({url}) {
    const classes = useStyles();
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
