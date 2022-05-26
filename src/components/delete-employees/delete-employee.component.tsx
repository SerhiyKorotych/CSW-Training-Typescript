import axios from "axios";
import { useContext, MouseEvent } from "react";
import {
  SelectedIDContext,
  SelectedIDContextType,
} from "../context/selected.id.context";
import { ActionContext, ActionContextType } from "../context/action.context";
import { EmployeeProps } from "../../App";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { DeleteContainer, Popup } from "./delete-employee.styles";

export type DeleteEmployeeProps = {
  employees: EmployeeProps[];
};

function DeleteEmployee({ employees }: DeleteEmployeeProps) {
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const { selectedID, setSelectedID } = useContext(
    SelectedIDContext
  ) as SelectedIDContextType;
  const employee = employees[Number(selectedID) - 1];

  const gotFired = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/employees/${selectedID}`);
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
      <DeleteContainer>
        <h2>Delete Employee</h2>
        <h4>Are you sure you want to delete {employee.name}?</h4>
        <Button buttonType={BUTTON_TYPE_CLASSES.delete} onClick={gotFired}>
          Delete
        </Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.cancel} onClick={handleCancel}>
          Cancel
        </Button>
      </DeleteContainer>
    </Popup>
  );
}

export default DeleteEmployee;
