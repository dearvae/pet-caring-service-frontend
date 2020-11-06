import React from 'react'
import { Card, Modal } from 'antd';
import 'antd/dist/antd.css';
import makeStyles from '@material-ui/core/styles/makeStyles'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { Meta } = Card;
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(3),
    },
  }))
const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  const doubleGridStyle = {
    width: '50%',
    textAlign: 'center',
  };
  
  function showDeleteConfirm(message) {
    confirm({
      title: 'Are you sure delete this pet?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        //call api
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

const PetCard = (props) => {
    const classes = useStyles()
    const { petInfo } = props;
    const { pname, requirements, belongs } = petInfo;

  return (
    <div className={classes.root}>
        <Card
            style={{ maxWidth: 1200 }}
            actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined onClick={showDeleteConfirm} key="delete" />
            ]}
        >
            <Card.Grid hoverable={false} style={gridStyle}> 
                Name: {pname}
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
               Category: {belongs}
            </Card.Grid>
            <Card.Grid hoverable={false} style={doubleGridStyle}>
                Requirements: {requirements}
            </Card.Grid>
            <Meta
            title="Card title"
            description="This is the description"
            />
        </Card>
    </div>
    )
}

export default PetCard
