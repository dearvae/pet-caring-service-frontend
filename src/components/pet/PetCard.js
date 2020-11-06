import React, { useState } from 'react';
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
  

const PetCard = (props) => {
    const classes = useStyles()
    const { petInfo } = props;
    const { pname, requirements, belongs } = petInfo;

    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
  
    const handleOk = e => {
        console.log("clicked ok")
         setVisible(false);
        fetch(`${process.env.NEXT_PUBLIC_API_PATH}/pets/${localStorage.getItem('username')}/${pname}`,
            {method: 'DELETE'});
        router.push('/owner/pet/pets');
    };
  
    const handleCancel = e => {
        setVisible(false);
    };



  return (
    <div className={classes.root}>
        <Modal
          title={"Delete pet " + pname}
          visible={visible}
          onOk={handleOk}
          okText="Delete"
          okType="danger"
          onCancel={handleCancel}
        >
            Are you sure you want to delete this pet?
        </Modal>
        <Card
            style={{ maxWidth: 1200 }}
            actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined onClick={showModal} key="delete" />
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
