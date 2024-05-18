import EmployeeRole from "../Components/EmployeeRole";
import EmployerRole from "../Components/EmployerRole";
import NavbarComponent1 from "../Components/NavBarComponent1";
import Footer from "../Components/Footer";
import { Typography } from "@material-tailwind/react";
import FinalNavBar from "../Components/FinalNavbar";
import NavBar from "./HomePageComponents/NavBar";
export default function ChooseRole() {
  return (
    <>
    <NavBar/>
      <center className="pt-20 mt-20">
      <Typography variant="h1" className="pb-20 text-mantis-950">Choose your role</Typography>
        <div className="flex items-center justify-center"> 
          <EmployeeRole/>
          <div className="pl-10"></div>
          <EmployerRole />
        </div>
      </center>
      
    </>
  );
}
