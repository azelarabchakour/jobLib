import React, { useState } from "react";
import "./style.css"; // Assuming the CSS file is in the same directory
import { Collapse } from "@material-tailwind/react";
import Switch from "./Switch";
import {useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/solid";
import person from "../Assets/person.jpeg";

export default function FinalNavBar() {
  const SwitchOptions = {
    OPTION1: "Option 1",
    OPTION2: "Option 2",
  };

  const [activeOption, setActiveOption] = useState(SwitchOptions.OPTION1);
  const [openNav, setOpenNav] = useState(false);
  const [switchState, setSwitchState] = useState(false); // State for the switch

  

  const [navItems, setNavItems] = useState([
    { label: "Matched Jobs", link: "/jobs" },
    { label: "Applications", link: "#" },
  ]);

  const handleNavItemClicked = (link) => {
    // Handle navigation here, e.g., using React Router
    //console.log("Navigating to:", link);
    navigate(link);
  };

  const handleSwitchToggle = () => {
    setSwitchState((prevState) => !prevState);
  };

  const handleSwitchClick = (option) => {
    setActiveOption(option);
    if (option === SwitchOptions.OPTION2) {
      setNavItems([
        { label: "Jobs", link: "/jobs" },
        { label: "Create", link: "/employer/createJob" },
      ]);
    } else if (option === SwitchOptions.OPTION1) {
      setNavItems([
        { label: "Matched Jobs", link: "#" },
        { label: "Applications", link: "#" },
      ]);
    }
  };
  
  const navigate = useNavigate();


  useEffect(() => {
    // Close the mobile navigation when the switch state changes
    setOpenNav(false);
  }, [switchState]);


  function Switch() {
    return (
      <div className="SwitchContainer">
        <div
          className="ToggleItem"
          style={{
            backgroundColor:
              activeOption === SwitchOptions.OPTION1 ? "grey" : "transparent",
          }}
          onClick={() => handleSwitchClick(SwitchOptions.OPTION1)}
        >
          <div className={"Text"}>Employee</div>
        </div>
        <div
          className="ToggleItem"
          style={{
            backgroundColor:
              activeOption === SwitchOptions.OPTION2 ? "grey" : "transparent",
          }}
          onClick={() => handleSwitchClick(SwitchOptions.OPTION2)}
        >
          <div className={"Text"}>Employer</div>
        </div>
      </div>
    );
  }

  function ProfileMenu({ handleLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    const profileMenuItems = [
      {
        label: "My Profile",
        icon: UserCircleIcon,
      },
      {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
      },
      {
        label: "Sign Out",
        icon: PowerIcon,
        onclick: handleLogout,
      },
    ];

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
              alt="tania andrew"
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
                  onclick && onclick();
                  closeMenu();
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  

  const navList = switchState ? (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Buttons for the first state of the switch */}
      {/* Modify these buttons as per your requirement */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          <b>Jobs</b>
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          <b>Account</b>
        </a>
      </Typography>
    </ul>
  ) : (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Buttons for the second state of the switch */}
      {/* Modify these buttons as per your requirement */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          <b>Blocks</b>
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          <b>Docs</b>
        </a>
      </Typography>
    </ul>
  );

  return (
    <>
      <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
        <Navbar className="sticky top-4 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-medium"
              variant="h4"
            >
              <div className="flex items-center gap-1">
                <img src={logo} className="w-40 pl-5" alt="" />
              </div>
            </Typography>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navItems.map((item, index) => (
                <a key={index} href={item.link} className="mr-4" onClick={() => handleNavItemClicked(item.link)}>
                  {item.label}
                </a>
              ))}</div>
              {/* ---------------------------------------------------- */}
              <Switch checked={switchState} onclick={handleSwitchToggle} />{" "}
              {/* Render the Switch component with props */}
              {/* ---------------------------------------------------- */}
              <div className="flex items-center gap-x-1">
                <ProfileMenu handleLogout={handleLogout} />
              </div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <Collapse open={openNav}>
            {navList}
            <div className="flex items-center gap-x-1">
              <Button fullWidth variant="text" size="sm" className="">
                <span>Log In</span>
              </Button>
              <Button fullWidth variant="gradient" size="sm" className="">
                <span>Sign in</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
        <div className="mx-auto max-w-screen-md py-7"></div>
      </div>
    </>
  );
}
