import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  
  export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Get the JWT token from localStorage
      const accessToken = localStorage.getItem("accessToken");
  
      // Check if accessToken exists
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
  
      // Define the headers with Authorization token
      const headers = {
        Authorization: `JWT ${accessToken}`,
      };
  
      // Fetch user info when component mounts with authorization header
      axios
        .get("http://127.0.0.1:8000/auth/users/me/", {
          headers: headers,
        })
        .then((response) => {
          // Set user info state
          console.log("ok");
          console.log(response.data);
          setUserInfo(response.data);
        })
        .catch((error) => {
          // Handle errors
          setError(error);
        });
    }, []);
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <Card className="mt-6 w-96">
        
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Profile
          </Typography>
          {userInfo && (
            <>
              <Typography>Username : <span>{userInfo.username}</span></Typography>
              <Typography>First Name : <span>{userInfo.first_name}</span></Typography>
              <Typography>Last Name : <span>{userInfo.last_name}</span></Typography>
              <Typography>Email :<span>{userInfo.email}</span></Typography>
            </>
          )}
        </CardBody>
        <CardFooter className="pt-0"></CardFooter>
      </Card>
    );
  }
  