import EmployeeRole from "../Components/EmployeeRole";
import EmployerRole from "../Components/EmployerRole";

export default function ChooseRole () {
    return (
        <div>
            <h1>Choose your role</h1>
            <EmployeeRole />
            <EmployerRole />
        </div>
    );
}