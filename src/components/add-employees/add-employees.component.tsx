import InputRoles from "../form-role/form-role.component";
import { FormEvent, useContext, useState } from "react";
import axios from "axios";
import NameInput from "../form-name/form-name.component";
import InputDate from "../form-date/form-date.component";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import InputPlatoon from "../form-platoon/form-platoon.component";
import { ActionContext, ActionContextType } from "../context/action.context";
import { FormContainer, Popup } from "./add-employees.styles";

const AddEmployee = () => {
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [platoon, setPlatoon] = useState("");

  const newEmployee = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/employees", {
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
      <FormContainer onSubmit={newEmployee}>
        <h2>Add Employee</h2>
        <NameInput setName={setName} />
        <InputDate setStartDate={setStartDate} />
        <InputRoles setRole={setRole} role={role} />
        <InputPlatoon setPlatoon={setPlatoon} platoon={platoon} />
        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.add}>
          Add
        </Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.cancel} onClick={handleCancel}>
          Cancel
        </Button>
      </FormContainer>
    </Popup>
  );
};

export default AddEmployee;
