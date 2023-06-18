import { Card, Typography } from "@material-tailwind/react";
import {isAfter, isBefore} from 'date-fns';
import { GoCircleSlash, GoCheck } from "react-icons/go";


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

export default function Example({tableRows}) {
  return (
    <Card className="overflow-scroll h-full w-full">
      <table className="w-full min-w-max table-auto text-left px-4">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head.th} className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${head.classes}`}>
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
          {tableRows.map(({name,status, startDate, endDate, Budget, id }, index) => {
            status = checkStatus(startDate, endDate) ?
             <>
                <span className="text-green-500"><GoCheck /></span>
                Active
             </> 
             :  <>
             <span className="text-red-500"><GoCircleSlash /></span>
             Disabled
            </>;
            const isLast = index === tableRows.length - 1;
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
  );
}