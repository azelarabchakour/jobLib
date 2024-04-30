import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import person from "../Assets/person.jpeg";
import { SparklesIcon } from "@heroicons/react/24/solid";
export default function ListOfApplicants(props) {
  return (
    <Card className="w-96">
      <List>
        {props.applications.map((application) => (
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src={person} />
            </ListItemPrefix>

            <div>
              <div className="flex items-center justify-between">
                <div className="">
                  <Typography variant="h6" color="blue-gray">
                    {application.employee.user.first_name}{" "}
                    {application.employee.user.last_name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {application.application_date}
                  </Typography>
                </div>

                <div className="flex items-center justify-between pl-24">
                  <SparklesIcon width={25}></SparklesIcon>
                  <Typography variant="h6" color="blue-gray" className="pl-2">
                    {application.matchPercentage}%
                  </Typography>
                </div>
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
