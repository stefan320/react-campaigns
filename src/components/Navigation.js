import { useContext } from "react";
import FilterContext from "../context/filtersContext";
import {
    Navbar,
    Typography,
    Input,
  } from "@material-tailwind/react";
   
  export default function Navigation() {
    const { searchInput, searchChangeHandler } = useContext(FilterContext);
    return (
      <Navbar fullWidth className="bg-teal-600">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer"
            color="white"
          >
            Campaigns
          </Typography>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              label="Search By Name"
              onChange={(ev)=> searchChangeHandler(ev)}
              value={searchInput}
              color="white"
              className="border-white"
            />
          </div>
        </div>
      </Navbar>
    );
  }