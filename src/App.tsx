import React from 'react'
import ResultsTable from './components/ResultsTable';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

export const App = React.memo(() => {
  // Create state for entire data.
  const [data, setData] = React.useState<any[]>([])

  function extractNestedArrays(obj: any): any[] {
    const arrays: any[] = [];

    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        arrays.push(obj[key]);
      }
    }
    console.log('Extracted arrays:', arrays);
    return arrays;
  }

  type SplitResult = {
    value: number;
    id: string;
    firstName: string;
    lastName: string;
  } | null;

  function getLowestSplitInfo(data: { id: string; firstName: string; lastName: string; splits: number[] }[]): SplitResult {
    let min = Infinity;
    let result: SplitResult = null;

    data.forEach(entry => {
      entry.splits.forEach(split => {
        if (split < min) {
          min = split;
          result = {
            value: split,
            id: entry.id,
            firstName: entry.firstName,
            lastName: entry.lastName,
          };
        }
      });
    });

    return result;
  }

  // Fetch data from backend. Ensure that backend is running!
  useEffect(() => {
      fetch("http://localhost:1337/api/groupByDate")
      .then((res) => res.json())
      .then((data) => {        
          setData(extractNestedArrays(data)); // Extract and set only the arrays
          console.log(data);
      });
  }, []);

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
      splits: [0.0, 0.0, 0.0]
    };
  }

  // Function to get the date from YYYYMMDD format to a readable format.
  function getDate(sDate: string): string {
      const year = sDate.slice(0, 4);
      const month = sDate.slice(4, 6); // Note: months are 0-based in JS Date
      const day = sDate.slice(6, 8);
      const oDate = new Date(`${year}-${month}-${day}`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      return oDate.toLocaleDateString("de-DE", options);
  }

  return (
    <Container>
      <Box marginBottom={5} sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              BSC Result Viewer (v 0.1 - Alpha)
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
        {data.map((item) => {
          const lowest = getLowestSplitInfo(item);
          return (
          <Box marginBottom={5}>
          <React.Fragment key={item[0].date}>
            <Typography variant="h4" gutterBottom>
              {getDate(item[0].date)}
            </Typography>
            <Typography variant="h6" gutterBottom> Bester Teiler des Tages: {" "}{lowest
            ? `${(lowest.value * 100000).toFixed(3)} (${lowest.firstName} ${lowest.lastName}, ID: ${lowest.id})`
            : "N/A"}
            </Typography>
            <ResultsTable rows={item} />
          </React.Fragment>
          </Box>
        );
      })}
    </Container>
  ); 
})

App.displayName = 'BSC ResultViewer'
export default App
