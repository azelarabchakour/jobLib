import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirst_name(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLast_name(event.target.value);
  };

  useEffect(() => {
    // Fetch user info when component mounts
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    const headers = {
      Authorization: `JWT ${accessToken}`,
    };

    axios
      .get("http://127.0.0.1:8000/auth/users/me/", { headers })
      .then((response) => {
        setEmail(response.data.email);
        setFirst_name(response.data.first_name);
        setLast_name(response.data.last_name);
      })
      .catch((error) => {
        // Handle errors
        setError(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    const headers = {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      // Update email, first & last name
      await axios.put(
        "http://127.0.0.1:8000/auth/users/me/",
        { email, first_name, last_name },
        { headers }
      );
      console.log("profile updated successfully");
      // Redirect back to user info page
      navigate("/profile");
    } catch (error) {
      // Handle errors
      console.error(error);
      setError(error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            color="red" //header card color
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center px-4 py-8 text-center bg-gradient-to-b from-mantis-400 to-mantis-700"
          >
            <div className="mb-4 h-1 p-6 text-white">
              <Typography variant="h4" className="text-mantis-50">
                Edit Profile
              </Typography>
            </div>
          </CardHeader>
            <CardBody className="flex flex-col gap-4">
  
              <Typography
                        className="-mb-2 text-mantis-900"
                        variant="h6"
                      >
                Email
              </Typography>
              <Input
              color="teal"
                label="Email"
                size="lg"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <Typography
                        className="-mb-2 text-mantis-900"
                        variant="h6"
                      >
                First Name
              </Typography>
              <Input
              color="teal"
                label="First Name"
                size="lg"
                type="text"
                value={first_name}
                onChange={handleFirstNameChange}
              />
              <Typography
                        className="-mb-2 text-mantis-900"
                        variant="h6"
                      >
                Last Name
              </Typography>
              <Input
              color="teal"
                label="Last Name"
                size="lg"
                type="text"
                value={last_name}
                onChange={handleLastNameChange}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="bg-mantis-600 text-mantis-50"
                type="submit"
                onClick={handleOpen}
                fullWidth
              >
                Change
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
