import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";

import person from "../Assets/person.jpeg"

export default function JobPostingCard(props) {
  return (
    <Card className="mt-6 w-4/5 max-h-48 overflow-hidden">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.jobTitle}
        </Typography>
        <Typography className="truncate">{props.jobDescription}</Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Button>See Details</Button>
        <div className="flex items-center -space-x-3">
          <Tooltip content="Natali Craig">
            <Avatar
              size="sm"
              variant="circular"
              alt="natali craig"
              src={person}
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Tooltip content="Tania Andrew">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          +5
        </div>
      </CardFooter>
    </Card>
  );
}
