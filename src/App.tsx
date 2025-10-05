import React from 'react'
import ResultsTable from './components/ResultsTable';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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

  function getLowestSplitValue(data: Record<string, { splits: number[] }[]>): number | null {
  let lowest: number | null = null;

  for (const entries of Object.values(data)) {
    for (const entry of entries) {
      for (const split of entry.splits) {
        if (lowest === null || split < lowest) {
          lowest = split;
        }
      }
    }
  }

  return lowest;
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
    <Container maxWidth="lg">
      {data.map((item) => (
        <React.Fragment key={item[0].date}>
          <Typography variant="h6" gutterBottom>
            {getDate(item[0].date)}
          </Typography>
          <ResultsTable rows={item} />
        </React.Fragment>
      ))}
    </Container>
  ); 
})

App.displayName = 'BSC ResultViewer'
export default App
