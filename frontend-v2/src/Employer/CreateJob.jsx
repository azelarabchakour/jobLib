import FinalNavBar from "../Components/FinalNavbar";
import NavBarComponent1 from "../Components/NavBarComponent1";
import StepperWithContent from "../Components/StepperWithContent";
import EmployerNavbar from "./EmployerNavbar";
export default function CreateJob() {

return (
   
    <>
    {/* <NavBarComponent1></NavBarComponent1> */}
    <EmployerNavbar selectedItem={0}/>
     <div>
    </div>

    <StepperWithContent></StepperWithContent>
    </>
  );
}