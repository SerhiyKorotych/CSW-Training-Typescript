import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ActionContext, ActionContextType } from "../context/action.context";
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
  ProjectAllocationContainer,
} from "./allocation-projects.styled";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import AddAllocation from "../add-allocation/add-allocation.component";
import { ProjectsProps } from "../../App";

export type UrlProps = {
  postUrl: string;
  selectedOptions: ProjectsProps[];
};

const ProjectAllocation = ({ postUrl, selectedOptions }: UrlProps) => {
  const [pressed, setPressed] = useState(false);
  const { allocations, setAllocations } = useContext(
    AllocationContext
  ) as AllocationContextType;
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const { selectedID, setSelectedID } = useContext(
    SelectedIDContext
  ) as SelectedIDContextType;
  const getAllocation = async () => {
    try {
      const response = await axios.get(`/api/employees/${selectedID}/projects`);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(allocations);
  useEffect(() => {
    getAllocation();
  }, [action]);

  return (
    <Popup>
      <ProjectAllocationContainer>
        <h1>Employee Projects</h1>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Allocation</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((allocation) => (
              <tr key={allocation.id}>
                <td>{allocation.project_name}</td>
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
      </ProjectAllocationContainer>
    </Popup>
  );
};

export default ProjectAllocation;
