import { useContext } from "react";
import FiltersContext from "../context/filtersContext";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';



import { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { XMarkIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

import "react-datepicker/dist/react-datepicker.css";


export default function RightDrawer() {
  const { startDate, updateStartDate,updateEndDate, clearStartDate,clearEndDate, endDate, } = useContext(FiltersContext);
  const [openRight, setOpenRight] = useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);


  const chips = [ {
    isOpen: startDate ? true : false,
    value: `Active Since ${format(new Date(startDate), 'MM/dd/yyyy')}`,
    closeHandler: () => clearStartDate() 
  }, {
    isOpen: endDate ? true : false,
    value: `Active until ${format(new Date(endDate), 'MM/dd/yyyy')}`,
    closeHandler: () => clearEndDate() 
 } ]
 
  return (
    <>
      <div className="flex flex-wrap gap-4 py-3 px-4">
        <Button onClick={openDrawerRight}  ripple={false} variant="text" className="text-blue-gray-900 hover:bg-teal-400 afer:bg-teal-400  p-4">
          <AdjustmentsHorizontalIcon onClick={openDrawerRight} strokeWidth={2} className="h-5 w-5"/>
        </Button>
        { chips.map(chip => chip.isOpen && <Chip open={chip.isOpen} color="teal" key={chip.value} value={chip.value} onClose={ chip.closeHandler } />) }
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 bg-teal-600"
        size={360}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="white">
            Filter Results
          </Typography>
          <IconButton
            variant="text"
            color="white"
            onClick={closeDrawerRight}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div>
          <Typography variant="paragraph" color="white">
              Filter by period
          </Typography>
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => updateStartDate(date)}
            placeholderText="Start"
            className="mt-4"
            maxDate={endDate}
            showYearDropdown
            onKeyDown={(e) => {
              e.preventDefault();
          }}
            />
            <DatePicker
            selected={endDate}
            onChange={(date) => updateEndDate(date)}
            minDate={startDate}
            placeholderText="End"
            className="mt-4"
            showYearDropdown
            onKeyDown={(e) => {
              e.preventDefault();
          }}
          />
        </div>
        </div>
      </Drawer>
    </>
  );
}