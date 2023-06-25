import React from "react";

import { useState } from "react";
import {startOfDay, endOfDay} from 'date-fns';

const FiltersContext = React.createContext();

function Provider({children}) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const filters = {
        startDate,
        endDate,
        searchInput,
        updateStartDate: (dateSelected)=> {
            setStartDate(startOfDay(dateSelected));
        },
        updateEndDate: (dateSelected)=> {
            setEndDate(endOfDay(dateSelected));
        },
        clearStartDate: () => {
            setStartDate(null);
        },
         clearEndDate: () => {
            setEndDate(null);
        },
        searchChangeHandler: (ev) => {
            setSearchInput(ev.target.value);
        },
    }

    return <FiltersContext.Provider value={filters}>
        {children}
    </FiltersContext.Provider>
}

export  { Provider };
export default FiltersContext;