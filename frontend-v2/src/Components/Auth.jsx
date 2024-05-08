import React from "react";
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

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Auth() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  //---------------------------
  const [type, setType] = useState("card");

  //AUTH LOGIC_______LOGIN______________________
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // navigate to the profile if accessToken is already present
      navigate('/chooseRole');
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/jwt/create/",
        {
          username,
          password,
        }
      );

      const { access, refresh } = response.data;

      // Storing access token and refresh token in local storage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Setting axios default headers with access token
      axios.defaults.headers.common["Authorization"] = `JWT ${access}`;

      console.log("Login successful:", response.data);

      navigate("/chooseRole"); //EDIT NAVIGATION

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  //_______________________________________________
  //AUTH LOGIC_______SIGN UP______________________
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post("http://localhost:8000/auth/users/", {
        username,
        email,
        password,
        first_name,
        last_name,
      });

      // Registration successful
      console.log("Registration successful:", response.data);
      // Redirect the user to the profile page
      navigate('/chooseRole');
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  //_______________________________________________

  return (
    <>
      <Button
        variant="gradient"
        size="sm"
        className=" transparent-background rounded-md bg-transparent px-6 py-2 text-base font-medium text-white duration-300 ease-in-out hover:bg-white hover:text-dark"
        style={{ whiteSpace: 'nowrap' , backgroundColor: 'transparent' }}
        onClick={handleOpen}
      >
    <span style={{ display: 'inline-block' }}>Join Us</span>
</Button>

      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] ">
          <CardHeader
            color="red" //header card color
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center px-4 py-8 text-center bg-gradient-to-b from-myBlue-400 to-myBlue-700"
          >
            <div className="mb-4 h-1 p-6 text-white">
              {type === "card" ? (
                <Typography variant="h5" className="text-myBlue-50">
                  SIGN IN
                </Typography>
              ) : (
                <Typography variant="h5" className="text-myBlue-50">
                  SIGN UP
                </Typography>
              )}
            </div>
          </CardHeader>
          <CardBody>
            <Tabs value={type} className="overflow-visible">
              <TabsHeader className="relative z-0 ">
                <Tab value="card" onClick={() => setType("card")}>
                  SIGN IN
                </Tab>
                <Tab value="paypal" onClick={() => setType("paypal")}>
                  SIGN UP
                </Tab>
              </TabsHeader>
              <TabsBody
                className="!overflow-x-hidden !overflow-y-visible"
                animate={{
                  initial: {
                    x: type === "card" ? 400 : -400,
                  },
                  mount: {
                    x: 0,
                  },
                  unmount: {
                    x: type === "card" ? 400 : -400,
                  },
                }}
              >
                {/* Sign in form */}
                <form onSubmit={handleLoginSubmit}>
                  <TabPanel value="card" className="p-0">
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography className="-mb-2 text-myBlue-800" variant="h6">
                          Your Username
                        </Typography>
                        <Input
                          label="Username"
                          color="blue-gray"
                          size="lg"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <Typography className="-mb-2 text-myBlue-800" variant="h6">
                          Your Password
                        </Typography>
                        <Input
                          label="Password"
                          color="blue-gray"
                          size="lg"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="-ml-2.5 -mt-3">
                          <Checkbox label="Remember Me" />
                        </div>
                      </CardBody>
                      <CardFooter className="pt-0 flex flex-col items-center gap-4">
                        <Button
                          // variant="gradient"
                          onClick={handleOpen}
                          fullWidth
                          type="submit"
                          className="bg-myBlue-700 text-myBlue-50"
                        >
                          Sign In
                        </Button>
                        <Typography
                          variant="small"
                          className="flex justify-center"
                        >
                          Don&apos;t have an account?
                          <Typography
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold text-myBlue-950"
                            onClick={handleOpen}
                          >
                            Sign up
                          </Typography>
                        </Typography>
                      </CardFooter>
                    </Card>
                  </TabPanel>
                </form>
                {/* Sign up Form */}
                <form onSubmit={handleSignUpSubmit}>
                  <TabPanel value="paypal" className="p-0">
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <CardBody className="flex flex-col gap-4">
                        <Typography className="-mb-2 text-myBlue-800" variant="h6">
                          Your Username
                        </Typography>
                        <Input
                          label="Username"
                          color="blue-gray"
                          size="lg"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <Typography className="-mb-2 text-myBlue-800" variant="h6">
                          Your Email
                        </Typography>
                        <Input
                          label="Email"
                          color="blue-gray"
                          size="lg"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography className="-mb-2 text-myBlue-800" variant="h6">
                          Your Password
                        </Typography>
                        <Input
                          label="Password"
                          color="blue-gray"
                          size="lg"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="my-4 flex items-center gap-4">
                          <div>
                            <Typography
                              variant="h6"
                              className="mb-2 text-myBlue-800"
                            >
                              First Name
                            </Typography>
                            <Input
                              label="First Name"
                              color="blue-gray"
                              containerProps={{ className: "min-w-[72px]" }}
                              value={first_name}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div>
                            <Typography
                              variant="h6"
                              className="mb-2 text-myBlue-800"
                            >
                              Last Name
                            </Typography>
                            <Input
                              label="Last Name"
                              color="blue-gray"
                              containerProps={{ className: "min-w-[72px]" }}
                              value={last_name}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                      </CardBody>
                      <CardFooter className="pt-0 flex flex-col items-center gap-4">
                        <Button
                          onClick={handleOpen}
                          fullWidth
                          type="submit"
                          className="bg-myBlue-700 text-myBlue-50"
                        >
                          Sign Up
                        </Button>
                        <Typography
                          variant="small"
                          className="flex justify-center"
                        >
                          You already have an account?
                          <Typography
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold text-myBlue-950"
                            onClick={handleOpen}
                          >
                            Sign in
                          </Typography>
                        </Typography>
                      </CardFooter>
                    </Card>
                  </TabPanel>
                </form>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
