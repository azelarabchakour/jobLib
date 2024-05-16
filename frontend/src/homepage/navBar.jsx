// import React, { useState } from "react";
// import "./homePageStyle.css";

// function Navbar() {
//   const [active, setActive] = useState("nav__menu");
//   const [icon, setIcon] = useState("nav__toggler");
//   const navToggle = () => {
//     if (active === "nav__menu") {
//       setActive("nav__menu nav__active");
//     } else setActive("nav__menu");

//     // Icon Toggler
//     if (icon === "nav__toggler") {
//       setIcon("nav__toggler toggle");
//     } else setIcon("nav__toggler");
//   };
//   return (
//     <nav className="nav">
//       <a href="#" className="nav__brand">
//         JobLib
//       </a>
//       <ul className={active}>
//         <li className="nav__item">
//           <a href="#" className="nav__link">
//             Home
//           </a>
//         </li>
//         <li className="nav__item">
//           <a href="#" className="nav__link">
//             About
//           </a>
//         </li>
//         <li className="nav__item">
//           <a href="#" className="nav__link">
//             Why Us
//           </a>
//         </li>
//         <li className="nav__item">
//           <a href="#" className="nav__link">
//             Contact
//           </a>
//         </li>
//         <li className="nav__item">
//           <a href="/signup" className="nav__link">
//             Sign Up
//           </a>
//         </li>
//       </ul>
//       <div onClick={navToggle} className={icon}>
//         <div className="line1"></div>
//         <div className="line2"></div>
//         <div className="line3"></div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Docs
        </a>
      </Typography>
    </ul>
  );
}
 
export function NewNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}



export default NewNavbar;
