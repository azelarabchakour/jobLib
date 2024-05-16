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

export default function SignIn() {
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
      navigate("/chooseRole");
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

      const headers = {
        Authorization: `JWT ${access}`,
      };

      axios
        .get("http://127.0.0.1:8000/auth/users/me/", {
          headers: headers,
        })
        .then((response) => {
          // Set user info state
          const { username, email, first_name, last_name, role } =
            response.data;

          // Storing access token and refresh token in local storage
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);

          // Setting axios default headers with access token
          axios.defaults.headers.common["Authorization"] = `JWT ${access}`;
          console.log("Login successful:", response.data);

          if (role == 0) {
            navigate("/employee/matchedJobs");
          } else {
            navigate("/employer/jobs");
          }
        })
        .catch((error) => {
          setError(error);
          setError(
            "Login failed. Please check your credentials and try again."
          );
          setOpen(true);
        });

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");
      setOpen(true);
    }
  };
  return (
    <>
      <Button
        variant="gradient"
        size="sm"
        className=" transparent-background rounded-md bg-transparent px-6 py-2 text-base font-medium text-white duration-300 ease-in-out hover:bg-white hover:text-dark"
        style={{ whiteSpace: "nowrap", backgroundColor: "transparent" }}
        onClick={handleOpen}
      >
        <span style={{ display: "inline-block" }}>Sign In</span>
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
            className="m-0 grid place-items-center px-4 py-8 text-center bg-gradient-to-b from-mantis-400 to-mantis-700"
          >
            <div className="mb-4 h-1 p-6 text-white">
              <Typography variant="h5" className="text-mantis-50">
                SIGN IN
              </Typography>
            </div>
          </CardHeader>
          <CardBody>
            <Tabs className="overflow-visible">
              <TabsBody className="">
                {/* Sign in form */}
                <form onSubmit={handleLoginSubmit}>
                  <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                      <Typography
                        className="-mb-2 text-mantis-900"
                        variant="h6"
                      >
                        Your Username
                      </Typography>
                      <Input
                        label="Username"
                        color="teal"
                        size="lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <Typography
                        className="-mb-2 text-mantis-900"
                        variant="h6"
                      >
                        Your Password
                      </Typography>
                      <Input
                        label="Password"
                        color="teal"
                        size="lg"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {error && (
                        <Typography
                          variant="small"
                          color="red"
                          className="flex justify-center"
                        >
                          {error}
                        </Typography>
                      )}
                    </CardBody>
                    <CardFooter className="pt-0 flex flex-col items-center gap-4">
                      <Button
                        // variant="gradient"
                        onClick={handleOpen}
                        fullWidth
                        type="submit"
                        className="bg-mantis-600 text-mantis-50"
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
                          className="ml-1 font-bold text-mantis-950"
                          onClick={() => navigate("/chooseRole")}
                        >
                          Sign up
                        </Typography>
                      </Typography>
                    </CardFooter>
                  </Card>
                </form>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
