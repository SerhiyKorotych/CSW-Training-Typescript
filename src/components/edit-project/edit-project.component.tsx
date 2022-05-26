import { useState, useContext, FormEvent } from "react";
import {
  SelectedIDContext,
  SelectedIDContextType,
} from "../context/selected.id.context";
import { ActionContext, ActionContextType } from "../context/action.context";
import axios from "axios";
import { ProjectContext, ProjectContextType } from "../context/project.context";
import ProjectNameInput from "../../project-form-name/project-form-name.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { Popup, EditProjectContainer } from "./edit-project.styles";

const EditProject = () => {
  const { projects, setProjects } = useContext(
    ProjectContext
  ) as ProjectContextType;
  const { selectedID, setSelectedID } = useContext(
    SelectedIDContext
  ) as SelectedIDContextType;
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const project = projects[Number(selectedID) - 1];
  const [name, setName] = useState(project.name);

  const editProjectInformation = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/projects/${selectedID}`, {
        name,
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
      <EditProjectContainer onSubmit={editProjectInformation}>
        <h2>Edit Project</h2>
        <ProjectNameInput setName={setName} />
        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.add}>
          Add
        </Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.cancel} onClick={handleCancel}>
          Cancel
        </Button>
      </EditProjectContainer>
    </Popup>
  );
};

export default EditProject;
