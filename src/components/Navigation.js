import {
    Navbar,
    Typography,
        Button,
    Input,
  } from "@material-tailwind/react";
   
  export default function Example() {
    return (
      <Navbar fullWidth>
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer "
          >
            Campaigns
          </Typography>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button size="sm" className="!absolute right-1 top-1 rounded">
              Search
            </Button>
          </div>
        </div>
      </Navbar>
    );
  }