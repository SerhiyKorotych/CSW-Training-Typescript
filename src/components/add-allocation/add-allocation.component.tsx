import { ChangeEvent, useContext, useState } from "react";
import {
  SelectedIDContext,
  SelectedIDContextType,
} from "../context/selected.id.context";
import axios from "axios";
import { FormEvent } from "react";
import {
  EmployeeContext,
  EmployeesContextType,
} from "../context/employees.context";
import { ActionContext, ActionContextType } from "../context/action.context";
import {
  AddAllocationForm,
  AddAllocationInput,
  AddAllocationSelect,
} from "./add-allocation.styled";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { EmployeeProps, ProjectsProps } from "../../App";
export type AddAllocationProps = {
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
  postUrl: string;
  selectedOptions: EmployeeProps[] | ProjectsProps[];
};

const AddAllocation = ({
  setPressed,
  postUrl,
  selectedOptions,
}: AddAllocationProps) => {
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const [name, setName] = useState("");
  const { employees, setEmployees } = useContext(
    EmployeeContext
  ) as EmployeesContextType;
  const { selectedID, setSelectedID } = useContext(
    SelectedIDContext
  ) as SelectedIDContextType;
  const [allocation, setAllocation] = useState("");

  const NewEmployeeAllocation = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(postUrl, {
        name,
        allocation,
      });
      setPressed(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setAction("");
  };
  console.log(postUrl);
  return (
    <AddAllocationForm onSubmit={NewEmployeeAllocation}>
      <AddAllocationSelect
        className="employee-allocation-name"
        required
        onChange={(e) => {
          setName(e.target.value);
          setPressed(false);
        }}
      >
        {selectedOptions.map((options) => (
          <option>{options.name}</option>
        ))}
      </AddAllocationSelect>
      <AddAllocationInput
        type="number"
        className="allocation-number"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAllocation(e.target.value)
        }
      ></AddAllocationInput>
      <Button buttonType={BUTTON_TYPE_CLASSES.add} type="submit">
        Add
      </Button>
      <Button buttonType={BUTTON_TYPE_CLASSES.cancel} onClick={handleCancel}>
        Cancel
      </Button>
    </AddAllocationForm>
  );
};

export default AddAllocation;
