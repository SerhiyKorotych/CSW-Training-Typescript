import { useContext } from "react";
import {
  EmployeeContext,
  EmployeesContextType,
} from "../context/employees.context";
import { ActionContext, ActionContextType } from "../context/action.context";
import AddEmployee from "../add-employees/add-employees.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  SelectedIDContext,
  SelectedIDContextType,
} from "../context/selected.id.context";
import { MouseEvent } from "react";
import EditEmployees from "../edit-employees/edit-employees.component";
import DeleteEmployee from "../delete-employees/delete-employee.component";
import {
  EmployeeTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTh,
  StyledTd,
} from "./employee-table.styles";
import ProjectAllocation from "../allocation-projects/allocation-projects.component";
import { ProjectContext, ProjectContextType } from "../context/project.context";
export type Props = {
  setShowProjectAllocation: React.Dispatch<React.SetStateAction<string>>;
};

const EmployeeTables = () => {
  const { projects, setProjects } = useContext(
    ProjectContext
  ) as ProjectContextType;
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const { employees, setEmployees } = useContext(
    EmployeeContext
  ) as EmployeesContextType;
  const { selectedID, setSelectedID } = useContext(
    SelectedIDContext
  ) as SelectedIDContextType;

  const AddHandler = () => {
    setAction("add");
  };
  const EditHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAction("edit");
    setSelectedID(e.currentTarget.value);
  };
  const DeleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAction("delete");
    setSelectedID(e.currentTarget.value);
  };
  const ProjectsHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAction("project-allocation");
    setSelectedID(e.currentTarget.value);
  };

  return (
    <EmployeeTableContainer>
      {action === "add" && <AddEmployee />}
      {action === "edit" && <EditEmployees employees={employees} />}
      {action === "delete" && <DeleteEmployee employees={employees} />}
      {action === "project-allocation" && (
        <ProjectAllocation
          selectedOptions={projects}
          postUrl={`/api/employees/${selectedID}/projects`}
        />
      )}

      <StyledTable>
        <StyledTableHead>
          <StyledTh>Name</StyledTh>
          <StyledTh>Starting Date</StyledTh>
          <StyledTh>Role</StyledTh>
          <StyledTh>Platoon</StyledTh>
          <StyledTh>Project</StyledTh>
          <StyledTh></StyledTh>
          <StyledTh></StyledTh>
        </StyledTableHead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <StyledTd>{employee.name}</StyledTd>
              <StyledTd>{employee.startDate}</StyledTd>
              <StyledTd>{employee.role}</StyledTd>
              <StyledTd>{employee.platoon}</StyledTd>
              <StyledTd>
                <button onClick={ProjectsHandler} value={employee.id}>
                  Projects
                </button>
              </StyledTd>
              <StyledTd>
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.edit}
                  onClick={EditHandler}
                  value={employee.id}
                >
                  Edit
                </Button>
              </StyledTd>
              <StyledTd>
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.delete}
                  onClick={DeleteHandler}
                  value={employee.id}
                >
                  Delete
                </Button>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Button buttonType={BUTTON_TYPE_CLASSES.add} onClick={AddHandler}>
        Add
      </Button>
    </EmployeeTableContainer>
  );
};

export default EmployeeTables;
