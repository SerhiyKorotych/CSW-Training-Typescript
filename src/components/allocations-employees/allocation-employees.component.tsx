import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AddAllocation from "../add-allocation/add-allocation.component";
import {
  EmployeeContext,
  EmployeesContextType,
} from "../context/employees.context";
import {
  SelectedIDContext,
  SelectedIDContextType,
} from "../context/selected.id.context";
import {
  AllocationContext,
  AllocationContextType,
} from "../context/allocation.context";
import {
  Popup,
  EmployeeAllocationContainer,
} from "./allocation-employees.styled";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { ActionContext, ActionContextType } from "../context/action.context";
import { Action } from "history";
import { EmployeeProps } from "../../App";

export type AllocationType = {
  id: number;
  employee_name: string;
  employee_id: number;
  project_name: string;
  project_id: number;
  allocation: number;
};

export type UrlProps = {
  postUrl: string;
  selectedOptions: EmployeeProps[];
};

const EmployeeAllocation = ({ postUrl, selectedOptions }: UrlProps) => {
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const { allocations, setAllocations } = useContext(
    AllocationContext
  ) as AllocationContextType;
  const { employees, setEmployees } = useContext(
    EmployeeContext
  ) as EmployeesContextType;
  const { selectedID, setSelectedID } = useContext(
    SelectedIDContext
  ) as SelectedIDContextType;
  const [pressed, setPressed] = useState(false);
  const getAllocation = async () => {
    try {
      const response = await axios.get(`/api/projects/${selectedID}/employees`);
      setAllocations(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllocation();
  }, [pressed]);

  return (
    <Popup>
      <EmployeeAllocationContainer>
        <h1>Project Employees</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Allocation</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((allocation) => (
              <tr key={allocation.id}>
                <td>{allocation.employee_name}</td>
                <td>{allocation.allocation}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <AddAllocation
          setPressed={setPressed}
          postUrl={postUrl}
          selectedOptions={selectedOptions}
        />
      </EmployeeAllocationContainer>
    </Popup>
  );
};

export default EmployeeAllocation;
