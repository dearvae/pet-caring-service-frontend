import React, { useState } from 'react'
import CarerNav from '../../../components/common/CarerNav'

import { makeStyles, withStyles } from '@material-ui/core/styles'

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
    minWidth: 800,
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
  "carer_name", "rating", "is_fulltime", "phone", "area"
];

export default function ProfileView({ data }) {

  const classes = useStyles();

  const dataToString = (row, col) => {
    const data = row[col];
    if (col.search("date") >= 0) {
      return data ? new Date(data).toLocaleString() : "";
    }
    return data ? String(data) : "";
  }
  
  return (
    <div>
      <CarerNav />
      <Container className={classes.cardGrid} maxWidth="md">
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                {columns.map((col, i) => <StyledTableCell key={i}>{ col }</StyledTableCell>)}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row, i) => ( */}
                <StyledTableRow >
                  { columns.map((col, j) => <StyledTableCell key={`${j}${j}`}>{ dataToString(j, col) }</StyledTableCell>)}
                </StyledTableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}
