import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect } from 'react';

// Function to structure data for table.
function createData (
  id: string,
  firstName: string,
  lastName: string,
  date: string,
  splits: number[]
) {
  return {
    id,
    firstName,
    lastName,
    date,
    splits: [0.0, 0.0, 0.0],
  };
}

// Define the prop type
type ResultsTableProps = {
  rows: ReturnType<typeof createData>[];
};

export default function ResultsTable({ rows }: ResultsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="results table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Vorname</TableCell>
            <TableCell>Nachname</TableCell>
            <TableCell align="right">1. Teiler</TableCell>
            <TableCell align="right">2. Teiler</TableCell>
            <TableCell align="right">3. Teiler</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))} */}
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell >{row.firstName}</TableCell>
              <TableCell >{row.lastName}</TableCell>
              <TableCell align="right">{(row.splits[0] * 100000).toFixed(3)}</TableCell>
              <TableCell align="right">{(row.splits[1] * 100000).toFixed(3)}</TableCell>
              <TableCell align="right">{(row.splits[2] * 100000).toFixed(3)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
