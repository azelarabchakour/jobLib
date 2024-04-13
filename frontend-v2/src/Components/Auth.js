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

import { useCountries } from "use-react-countries";
import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

function formatCardNumber(value) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function formatExpires(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

export default function Auth() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  //---------------------------
  const [type, setType] = useState("card");

  return (
    <>
      <Button
        variant="gradient"
        size="sm"
        className="hidden lg:inline-block"
        onClick={handleOpen}
      >
        Sign In
      </Button>
      <Dialog
        size="s"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center px-4 py-8 text-center"
          >
            <div className="mb-4 h-1 p-6 text-white">
              {type === "card" ? (
                <Typography variant="h5" color="white">
                  SIGN IN
                </Typography>
              ) : (
                <Typography variant="h5" color="white">
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
                <TabPanel value="card" className="p-0">
                  <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                      <Typography className="-mb-2" variant="h6">
                        Your Username
                      </Typography>
                      <Input label="Username" size="lg" />
                      <Typography className="-mb-2" variant="h6">
                        Your Password
                      </Typography>
                      <Input label="Password" size="lg" />
                      <div className="-ml-2.5 -mt-3">
                        <Checkbox label="Remember Me" />
                      </div>
                    </CardBody>
                    <CardFooter className="pt-0 flex flex-col items-center gap-4">
                      <Button variant="gradient" onClick={handleOpen} fullWidth>
                        Sign In
                      </Button>
                      <Button
                        size="lg"
                        variant="outlined"
                        color="blue-gray"
                        className="flex items-center gap-3"
                      >
                        <img
                          src="https://docs.material-tailwind.com/icons/google.svg"
                          alt="metamask"
                          className="h-6 w-6"
                        />
                        Continue with Google
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
                          className="ml-1 font-bold"
                          onClick={handleOpen}
                        >
                          Sign up
                        </Typography>
                      </Typography>
                    </CardFooter>
                  </Card>
                </TabPanel>
                <TabPanel value="paypal" className="p-0">
                  <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                      <Typography className="-mb-2" variant="h6">
                        Your Username
                      </Typography>
                      <Input label="Username" size="lg" />
                      <Typography className="-mb-2" variant="h6">
                        Your Password
                      </Typography>
                      <Input label="Password" size="lg" />
                      <div className="my-4 flex items-center gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium"
                          >
                            First Name
                          </Typography>
                          <Input label="First Name" containerProps={{ className: "min-w-[72px]" }} />
                        </div>
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium"
                          >
                            Last Name
                          </Typography>
                          <Input label="Last Name" containerProps={{ className: "min-w-[72px]" }} />
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter className="pt-0 flex flex-col items-center gap-4">
                      <Button variant="gradient" onClick={handleOpen} fullWidth>
                        Sign Up
                      </Button>
                      <Button
                        size="lg"
                        variant="outlined"
                        color="blue-gray"
                        className="flex items-center gap-3"
                      >
                        <img
                          src="https://docs.material-tailwind.com/icons/google.svg"
                          alt="metamask"
                          className="h-6 w-6"
                        />
                        Continue with Google
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
                          className="ml-1 font-bold"
                          onClick={handleOpen}
                        >
                          Sign in
                        </Typography>
                      </Typography>
                    </CardFooter>
                  </Card>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
