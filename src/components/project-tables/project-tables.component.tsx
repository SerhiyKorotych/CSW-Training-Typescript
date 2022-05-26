import { useContext, MouseEvent } from "react";
import { ProjectContext, ProjectContextType } from "../context/project.context";
import AddProject from "../add-project/add-project.component";
import { ActionContext, ActionContextType } from "../context/action.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import EditProject from "../edit-project/edit-project.component";
import {
  SelectedIDContext,
  SelectedIDContextType,
} from "../context/selected.id.context";
import DeleteProject from "../delete-project/delete-project.component";
import {
  ProjectTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTd,
  StyledTh,
} from "./project-tables.styles";
import EmployeeAllocation from "../allocations-employees/allocation-employees.component";
import {
  EmployeeContext,
  EmployeesContextType,
} from "../context/employees.context";

const ProjectTables = () => {
  const { employees, setEmployees } = useContext(
    EmployeeContext
  ) as EmployeesContextType;
  const { selectedID, setSelectedID } = useContext(
    SelectedIDContext
  ) as SelectedIDContextType;
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const { projects, setProjects } = useContext(
    ProjectContext
  ) as ProjectContextType;

  const AddProjectHandler = () => {
    setAction("addProject");
  };
  const EditProjectHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAction("editProject");
    setSelectedID(e.currentTarget.value);
  };
  const DeleteProjectHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAction("deleteProject");
    setSelectedID(e.currentTarget.value);
  };
  const EmployeesHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setAction("employees-allocation");
    setSelectedID(e.currentTarget.value);
  };

  return (
    <ProjectTableContainer>
      {action == "addProject" && <AddProject />}
      {action == "editProject" && <EditProject />}
      {action == "deleteProject" && <DeleteProject projects={projects} />}
      {action == "employees-allocation" && (
        <EmployeeAllocation
          selectedOptions={employees}
          postUrl={`/api/projects/${selectedID}/employees`}
        />
      )}

      <StyledTable>
        <StyledTableHead>
          <StyledTh>Name</StyledTh>
          <StyledTh>Employees</StyledTh>
        </StyledTableHead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <StyledTd>{project.name}</StyledTd>
              <StyledTd>
                <button onClick={EmployeesHandler} value={project.id}>
                  Employees
                </button>
              </StyledTd>
              <StyledTd>
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.edit}
                  value={project.id}
                  onClick={EditProjectHandler}
                >
                  Edit
                </Button>
              </StyledTd>
              <StyledTd>
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.delete}
                  onClick={DeleteProjectHandler}
                  value={project.id}
                >
                  Delete
                </Button>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Button buttonType={BUTTON_TYPE_CLASSES.add} onClick={AddProjectHandler}>
        Add
      </Button>
    </ProjectTableContainer>
  );
};

export default ProjectTables;
