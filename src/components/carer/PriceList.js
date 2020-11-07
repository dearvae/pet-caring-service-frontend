import React from 'react'
import MaterialTable from 'material-table'
import makeStyles from '@material-ui/core/styles/makeStyles'
import InfoIcon from '@material-ui/icons/Info';
import { forwardRef } from 'react';
import { AccountBookOutlined } from '@ant-design/icons';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useRouter } from 'next/router'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },
}))

const PriceList = (props) => {
    const classes = useStyles()
    const router = useRouter()
    const { categoryList } = props;

  return (
    <div className={classes.root}>
    <MaterialTable
      icons={tableIcons}
      title="Category Price List"
      columns={[
        { title: 'Category', field: 'category_name' },
        { title: 'Price', field: 'carer_price' }
      ]}
      data={categoryList}   
      actions={[
        {
          icon: () => <AccountBookOutlined key="bid" />,
          tooltip: 'Bid me!',
          onClick: (event, rowData) => router.push(`/owner/bid/${rowData.carer_name}/${rowData.category_name}`)
        },
      ]}     
      options={{
        search: true
      }}
    />
    </div>
    )
}

export default PriceList