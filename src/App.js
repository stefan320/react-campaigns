import { useEffect, useState } from 'react';
import FiltersContext from "./context/filtersContext";

import {isAfter, isBefore, isWithinInterval,addDays, subDays} from 'date-fns'

import Navigation from './components/Navigation';
import RightDrawer from './components/RightDrawer';
import Table from './pages/Table';

import { useContext } from "react";


function App() {
const { startDate, endDate, searchInput} = useContext(FiltersContext);

const [tableRows, setTableRows ]= useState([
  {
    "id": "A1B2C3D4",
    "name": "John",
    "startDate": "01/15/2021",
    "endDate": "02/28/2021",
    "Budget": 50000
    },
    {
    "id": "E5F6G7H8",
    "name": "Emma",
    "startDate": "03/05/2021",
    "endDate": "04/30/2021",
    "Budget": 60000
    },
    {
    "id": "I9J0K1L2",
    "name": "Michael",
    "startDate": "06/21/2021",
    "endDate": "08/01/2021",
    "Budget": 55000
    },
    {
    "id": "M3N4O5P6",
    "name": "Sophia",
    "startDate": "09/10/2021",
    "endDate": "10/31/2021",
    "Budget": 65000
    },
    {
    "id": "Q7R8S9T0",
    "name": "Robert",
    "startDate": "12/01/2021",
    "endDate": "01/15/2022",
    "Budget": 48000
    },
    {
    "id": "U1V2W3X4",
    "name": "Olivia",
    "startDate": "02/25/2022",
    "endDate": "04/10/2022",
    "Budget": 55000
    },
    {
    "id": "Y5Z6A7B8",
    "name": "James",
    "startDate": "04/30/2022",
    "endDate": "06/15/2022",
    "Budget": 60000
    },
    {
    "id": "C9D0E1F2",
    "name": "William",
    "startDate": "07/10/2022",
    "endDate": "08/25/2022",
    "Budget": 55000
    },
    {
    "id": "G3H4I5J6",
    "name": "Ava",
    "startDate": "09/20/2022",
    "endDate": "10/31/2022",
    "Budget": 65000
    },
    {
    "id": "K7L8M9N0",
    "name": "David",
    "startDate": "11/05/2022",
    "endDate": "12/20/2022",
    "Budget": 48000
    },
    {
    "id": "O1P2Q3R4",
    "name": "Mary",
    "startDate": "01/15/2023",
    "endDate": "02/28/2023",
    "Budget": 55000
    },
    {
    "id": "S5T6U7V8",
    "name": "Liam",
    "startDate": "03/05/2023",
    "endDate": "04/20/2023",
    "Budget": 60000
    },
    {
    "id": "W9X0Y1Z2",
    "name": "Emma",
    "startDate": "05/10/2023",
    "endDate": "06/25/2023",
    "Budget": 55000
    },
    {
    "id": "A3B4C5D6",
    "name": "Noah",
    "startDate": "07/20/2023",
    "endDate": "08/31/2023",
    "Budget": 65000
    },
    {
    "id": "E7F8G9H0",
    "name": "Isabella",
    "startDate": "09/05/2023",
    "endDate": "10/20/2023",
    "Budget": 55000
    },
    {
    "id": "I1J2K3L4",
    "name": "Ethan",
    "startDate": "11/10/2023",
    "endDate": "12/25/2023",
    "Budget": 60000
    },
    {
    "id": "M5N6O7P8",
    "name": "Mia",
    "startDate": "01/15/2024",
    "endDate": "02/28/2024",
    "Budget": 55000
    },
    {
    "id": "Q9R0S1T2",
    "name": "Jacob",
    "startDate": "03/05/2024",
    "endDate": "04/20/2024",
    "Budget": 60000
    },
    {
    "id": "U3V4W5X6",
    "name": "Sophia",
    "startDate": "05/10/2024",
    "endDate": "06/25/2024",
    "Budget": 55000
    },
    {
    "id": "Y7Z8A9B0",
    "name": "Alexander",
    "startDate": "07/20/2024",
    "endDate": "08/31/2024",
    "Budget": 65000
    }
  ]);

useEffect( ()=> {
  window.AddCampaigns = (newRows) => {
    setTableRows([...tableRows, ...newRows])
  }
},
[tableRows]);


const filteredRows = tableRows.filter(row => {
  const searchVal = row.name.toLowerCase().includes(searchInput.toLowerCase());
  const rowStartDate = new Date (row.startDate);
  const rowEndDate = new Date(row.endDate);

  if(isBefore(rowEndDate, rowStartDate)) return false;

  if (startDate && endDate) {
    const withinDates = isWithinInterval(rowStartDate, {start: startDate, end: endDate }) 
    ||
    isWithinInterval(rowEndDate, { start: startDate,  end: endDate });

    return searchVal && withinDates;
  } 
  else if (startDate && !endDate) {
    return searchVal && isAfter(rowStartDate, subDays(startDate, 1) );
  } else if (endDate && !startDate) {
    return searchVal && isBefore( endDate, addDays( rowEndDate, 1) );
  } else {
    return searchVal
  }
});

  return (
    <>
      <Navigation/>
      <RightDrawer />
      <Table filteredRows={filteredRows}/>
    </>
  );
}


export default App;
