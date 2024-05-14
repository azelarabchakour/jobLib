import React, { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars2Icon,
  NewspaperIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import person from "../Assets/person.jpeg";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function EmployeeNavbar(props) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("logged out");
    navigate("/");
  };

  const handleNavigate = (id) => {
    if (id == 0) {
      navigate("/employee/matchedJobs");
    } else if (id == 1) {
      navigate("/employee/applications");
    } else if (id == 2) {
      navigate("/employee/uploadCv");
    } else if (id == 3) {
      navigate("/employee/testJD");
    }
  };

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  function ProfileMenu({ handleLogout }) {
    // Profile menu items
    const profileMenuItems = [
      {
        label: "Edit Profile",
        icon: UserCircleIcon,
        onclick: handleOpenEditProfile, // Pass handleLogout function to onclick
      },
      {
        label: "Change Password",
        icon: Cog6ToothIcon,
        onclick: handleOpenEditPassword, // Pass handleLogout function to onclick
      },
      {
        label: "Sign Out",
        icon: PowerIcon,
        onclick: handleLogout, // Pass handleLogout function to onclick
      },
    ];

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              className="border border-mantis-500 p-0.5"
              src={person}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, onclick }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  onclick && onclick(); // Invoke onclick function if provided
                  closeMenu();
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${
                    isLastItem ? "text-red-500" : "text-mantis-500"
                  }`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className={`font-bold ${
                    isLastItem ? "text-red-500" : "text-mantis-900"
                  }`}
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  // nav list component
  const navListItems = [
    {
      id: 0,
      label: "Matched Jobs",
      icon: SparklesIcon,
    },
    {
      id: 1,
      label: "Applications",
      icon: PaperAirplaneIcon,
    },
    {
      id: 2,
      label: "Resume",
      icon: NewspaperIcon,
    },
    {
      id: 3,
      label: "Job Analyzer",
      icon: ChartBarIcon,
    },
  ];

  function NavList() {
    return (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {navListItems.map(({ id, label, icon }, key) => (
          <MenuItem
            key={key}
            onClick={() => handleNavigate(id)}
            className={`flex items-center gap-2 lg:rounded-full font-bold ${
              props.selectedItem === id
                ? "text-mantis-600 bg-mantis-100"
                : "text-mantis-900 hover:text-mantis-600"
            }`}
          >
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="whitespace-nowrap">{label}</span>
          </MenuItem>
        ))}
      </ul>
    );
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  //---------------------- EDIT PASSWORD MODAL ----------------------//

  const [openEditPassword, setOpenEditPassword] = React.useState(false);
  const handleOpenEditPassword = () => setOpenEditPassword((cur) => !cur);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorPassword("Passwords do not match");
      setOpenEditPassword(true);
      return;
    }

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
      toast.success("Password updated successfully.");
      // Redirect back to user info page
      setOpenEditPassword(false);
    } catch (error) {
      // Handle errors
      console.error(error);
      setOpenEditPassword(true);
      setErrorPassword("Error updating password");
      toast.error("Error updating password.");
    }
  };
  //------------------------------------------------------------------

  //---------------------- EDIT PROFILE MODAL ----------------------//
  const [openEditProfile, setOpenEditProfile] = React.useState(false);
  const handleOpenEditProfile = () => setOpenEditProfile((cur) => !cur);

  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  const [errorProfile, setErrorProfile] = useState(null);

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
        setErrorProfile(error);
      });
  }, []);

  const handleEditProfile = async (event) => {
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
        { email, first_name, last_name ,role:0},
        { headers }
      );
      console.log("profile updated successfully");
      toast.success("Profile updated successfully.");
      setOpenEditProfile(false);
      // Redirect back to user info page
    } catch (error) {
      // Handle errors
      console.error(error);
      setErrorProfile(error);
      toast.error("Error updating profile.");
      setOpenEditProfile(false);
    }
  };
  //-----------------------------------------------------------------

  return (
    <>
      <Navbar className="mx-auto max-w-full p-2 lg:pl-6">
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
            <img src={logo} alt="logo" className="h-10 w-30" />
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

          <div>
            <ProfileMenu handleLogout={handleLogout} />
          </div>
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList />
        </Collapse>
      </Navbar>
      {/* Edit Password Modal */}
      <Dialog
        size="xs"
        open={openEditPassword}
        handler={handleOpenEditPassword}
        className="bg-transparent shadow-none"
      >
        <form>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardHeader
              color="red" //header card color
              floated={false}
              shadow={false}
              className="m-0 grid place-items-center px-4 py-8 text-center bg-gradient-to-b from-mantis-400 to-mantis-700"
            >
              <div className="mb-4 h-1 p-6 text-white">
                <Typography variant="h4" className="text-mantis-50">
                  Modify Password
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Typography className="-mb-2 text-mantis-900" variant="h6">
                Old Password
              </Typography>
              <Input
                label="Old Password"
                color="teal"
                size="lg"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Typography className="-mb-2 text-mantis-900" variant="h6">
                New Password
              </Typography>
              <Input
                label="New Password"
                color="teal"
                size="lg"
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />

              <Typography className="-mb-2 text-mantis-900" variant="h6">
                Confirm New Password
              </Typography>
              <Input
                label="Confirm New Password"
                color="teal"
                size="lg"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {errorPassword && (
                <Typography variant="small" color="red">
                  {errorPassword}
                </Typography>
              )}
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="bg-mantis-600 text-mantis-50"
                type="submit"
                onClick={handleChangePassword}
                fullWidth
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>

      <Toaster position="bottom-right" reverseOrder={false} />
      {/* Edit Profile Modal  */}
      <Dialog
        size="xs"
        open={openEditProfile}
        handler={handleOpenEditProfile}
        className="bg-transparent shadow-none"
      >
        <form>
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
              <Typography className="-mb-2 text-mantis-900" variant="h6">
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
              <Typography className="-mb-2 text-mantis-900" variant="h6">
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
              <Typography className="-mb-2 text-mantis-900" variant="h6">
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
                onClick={handleEditProfile}
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
