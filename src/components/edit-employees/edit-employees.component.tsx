import { EmployeeProps } from "../../App";
import axios from "axios";
import { ActionContext, ActionContextType } from "../context/action.context";
import { useContext, useState, FormEvent } from "react";
import {
  SelectedIDContext,
  SelectedIDContextType,
} from "../context/selected.id.context";
import NameInput from "../form-name/form-name.component";
import InputDate from "../form-date/form-date.component";
import InputRoles from "../form-role/form-role.component";
import InputPlatoon from "../form-platoon/form-platoon.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { EditEmployeeContainer, Popup } from "./edit-project.styles";

export type EditEmployeesProps = {
  employees: EmployeeProps[];
};

const EditEmployees = ({ employees }: EditEmployeesProps) => {
  const { selectedID, setSelectedID } = useContext(
    SelectedIDContext
  ) as SelectedIDContextType;
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const employee = employees[Number(selectedID) - 1];
  const [name, setName] = useState(employee.name);
  const [startDate, setStartDate] = useState(employee.startDate);
  const [role, setRole] = useState(employee.role);
  const [platoon, setPlatoon] = useState(employee.platoon);

  console.log(name);

  const editEmployeeInformation = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/employees/${selectedID}`, {
        name,
        startDate,
        role,
        platoon,
      });
      setAction("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setAction("");
  };

  return (
    <Popup>
      <EditEmployeeContainer onSubmit={editEmployeeInformation}>
        <h2>Edit Employee</h2>
        <NameInput setName={setName} />
        <InputDate setStartDate={setStartDate} />
        <InputRoles role={role} setRole={setRole} />
        <InputPlatoon platoon={platoon} setPlatoon={setPlatoon} />
        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.add}>
          Add
        </Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.cancel} onClick={handleCancel}>
          Cancel
        </Button>
      </EditEmployeeContainer>
    </Popup>
  );
};

export default EditEmployees;
