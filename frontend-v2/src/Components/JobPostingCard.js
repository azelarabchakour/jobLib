import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

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
        <Button>Read More</Button>
        <Typography className="font-normal">{props.salary}</Typography>
      </CardFooter>
    </Card>
  );
}
