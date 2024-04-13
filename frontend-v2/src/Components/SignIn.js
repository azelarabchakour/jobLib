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

export function SignInDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

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
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your Username and password to Sign In.
            </Typography>
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
            <Typography variant="small" className="flex justify-center">
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
      </Dialog>
    </>
  );
}
