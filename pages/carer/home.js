import React, { useEffect, useState } from 'react';

import CarerNav from '../../src/components/common/CarerNav';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
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

let columns = [
  "start_date", "end_date", "owner_name", "pname",
  "bid_date", "daily_price", "credit_card_num",
  "payment_date", "payment_mode", "delivery_method"
].map(colName => {
  let displayName = colName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  let minWidth = colName.includes("date") ? 200 : 50;
  if (colName === "pname") {
    displayName = "Pet Name";
  }
  return { key: colName, displayName, minWidth }
});

export default function HistoryOrders() {
  const showingCurrentPets = "Currently showing current pets (Click to toggle)";
  const showingUpcomingPets = "Currently showing upcoming pets (Click to toggle)";

  const [successfulBids, setSuccessfulBids] = useState([]);
  const [unsuccessfulBids, setUnsuccessfulBids] = useState([]);
  const [displayRows, setDisplayRows] = useState([]);
  const [showSuccessfulBids, setShowSuccessfulBids] = useState(true);
  const [buttonText, setButtonText] = useState(showingCurrentPets);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/bids/carer/${localStorage.getItem('username')}/`)
    .then(res => res.json())
    .then(json => {
      const d = Date.now();
      const currentPets = json.filter(row => (new Date(row.start_date) <= d && new Date(row.end_date) >= d) && row.is_successful);
      const upcomingPets = json.filter(row => (new Date(row.start_date) >= d) && row.is_successful);
      setSuccessfulBids(currentPets);
      setUnsuccessfulBids(upcomingPets);
      setDisplayRows(showSuccessfulBids ? currentPets : upcomingPets);
    })
  }, []);

  const classes = useStyles();

  const dataToString = (row, col) => {
    const data = row[col];
    if (col.search("date") >= 0) {
      return data ? new Date(data).toLocaleString() : "";
    }
    return data ? String(data) : "";
  }

  const toggleButtons = () => {
    const temp = !showSuccessfulBids;
    setShowSuccessfulBids(temp);
    setDisplayRows(temp ? successfulBids : unsuccessfulBids);
    setButtonText(temp ? showingCurrentPets : showingUpcomingPets);
  }

  return (
    <div>
      <CarerNav />
      <Container className={classes.cardGrid} maxWidth="md">
        <Box m={1}>
          <ButtonGroup variant="contained" color="secondary" >
            <Button onClick={toggleButtons}>{buttonText}</Button>
          </ButtonGroup>
        </Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                {columns.map((col, i) => <StyledTableCell style={{ minWidth: col.minWidth }} key={i}>{ col.displayName }</StyledTableCell>)}
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {displayRows.map((row, i) => (
                <StyledTableRow key={i}>
                  { columns.map((col, j) => <StyledTableCell key={`${i}${j}`}>{ dataToString(row, col.key) }</StyledTableCell>)}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}
