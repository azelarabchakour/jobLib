import EmployeeRole from "../Components/EmployeeRole";
import EmployerRole from "../Components/EmployerRole";
import NavbarComponent1 from "../Components/NavBarComponent1";
import Footer from "../Components/Footer";
import { Typography } from "@material-tailwind/react";
export default function ChooseRole() {
  return (
    <>
      <NavbarComponent1 />
      <center>
      <Typography variant="h1" className="pb-20 text-myBlue-900">Choose your role</Typography>
        <div className="flex items-center justify-center"> 
          <EmployeeRole/>
          <div className="pl-10"></div>
          <EmployerRole />
        </div>
      </center>
      <Footer />
      
    </>
  );
}
