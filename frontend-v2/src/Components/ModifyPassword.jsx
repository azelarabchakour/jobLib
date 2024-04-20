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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ModifyPassword() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

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
      // Update password
      await axios.post(
        "http://127.0.0.1:8000/auth/users/set_password/",
        { current_password: password, new_password: newPassword },
        { headers }
      );
      console.log("Password updated successfully");
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
      <Button onClick={handleOpen}>Change Password</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit}>
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            
            <Typography variant="h4" color="blue-gray">
              Modify Password
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Old Password
            </Typography>
            <Input
              label="Old Password"
              size="lg"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Typography className="-mb-2" variant="h6">
              New Password
            </Typography>
            <Input
              label="New Password"
              size="lg"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
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
