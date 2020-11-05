import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CarerNav from '../../../components/common/CarerNav'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}))

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.black,
    fontSize: 18,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const columns = [
  "start_date", "end_date", "owner_name", "pname",
  "bid_date", "daily_price", "credit_card_num",
  "payment_date", "payment_mode", "delivery_method", "review_rating",
  "review_content", "review_date"
];

export default function HistoryOrdersView({ data }) {
  const successfulBids = data.filter(row => row.is_successful);
  const unsuccessfulBids = data.filter(row => !row.is_successful);
  const [rows, setRows] = useState(successfulBids);
  const [disableSuccessfulBids, setDisableSuccessfulBids] = useState(true);
  const [disableUnsuccessfulBids, setDisableUnsuccessfulBids] = useState(false);

  const classes = useStyles();

  const dataToString = (row, col) => {
    const data = row[col];
    if (col.search("date") >= 0) {
      return data ? new Date(data).toLocaleString() : "";
    }
    return data ? String(data) : "";
  }

  const toggleButtons = () => {
    setDisableSuccessfulBids(!disableSuccessfulBids);
    setDisableUnsuccessfulBids(!disableUnsuccessfulBids);
  }
  const toggleSuccessful = () => {
    toggleButtons();
    setRows(successfulBids);
  }
  const toggleUnsuccessful = () => {
    toggleButtons();
    setRows(unsuccessfulBids);
  }

  return (
    <div>
      <CarerNav />
      <Container className={classes.cardGrid} maxWidth="md">
        <Box m={1}>
          <ButtonGroup variant="contained" color="secondary" >
            <Button disabled={disableSuccessfulBids} onClick={toggleSuccessful}>Successful Bids</Button>
            <Button disabled={disableUnsuccessfulBids} onClick={toggleUnsuccessful}>Unsuccessful Bids</Button>
          </ButtonGroup>
        </Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                {columns.map((col, i) => <StyledTableCell key={i}>{ col }</StyledTableCell>)}
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, i) => (
                <StyledTableRow key={i}>
                  { columns.map((col, j) => <StyledTableCell key={`${i}${j}`}>{ dataToString(row, col) }</StyledTableCell>)}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}
