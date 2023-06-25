import { Card, Typography } from "@material-tailwind/react";
import { isAfter, isBefore } from 'date-fns';

import { CheckCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = [
    {th: "Name", classes: "text-left" },
    {th: "Status", classes: "text-left"},
    {th: "Start date", classes: "text-center"},
    {th: "End date", classes: "text-end"},
    {th: "Budget", classes: "text-end"},
];
const currentDate = new Date(); 
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const checkStatus = (startDate, endDate) => {
    const isAfterStart = isAfter(currentDate, new Date(startDate));
    const isBeforeEnd = isBefore(currentDate, new Date(endDate));
    let status = isAfterStart && isBeforeEnd ? true : false
    
    return status;
} 


export default function Table( {filteredRows} ) {
  return (
    <div className="px-4 mb-4">
    <Card className="h-full w-full">
      <table className="w-full min-w-max table-auto text-left px-4">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head.th} className={`border-b border-blue-teal-200 bg-teal-50 p-4 ${head.classes}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head.th}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {
          filteredRows.map(
            ({name,status, startDate, endDate, Budget, id }, index) => {
            status = checkStatus(startDate, endDate) ?
             <>
                <span className="text-green-500"><CheckCircleIcon  strokeWidth={2} className="h-5 w-5"/></span>
                Active
             </> 
             :  
             <>
             <span className="text-red-500"><NoSymbolIcon strokeWidth={2} className="h-5 w-5" /></span>
             Disabled
            </>;
            const isLast = index === filteredRows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal flex items-center">
                    {status}
                  </Typography>
                </td>
                <td className={classes + " text-center"}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {startDate}
                  </Typography>
                </td>
                <td className={classes + " text-end"}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {endDate}
                  </Typography>
                </td>
                <td className={classes + " text-end"}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {formatter.format(Budget)}
                  </Typography>
                </td>         
              </tr>
            );
          })} 
        </tbody>
      </table>
    </Card>
    
    </div>
  );
}