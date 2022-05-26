import axios from "axios";
import { useContext, MouseEvent } from "react";
import {
  SelectedIDContext,
  SelectedIDContextType,
} from "../context/selected.id.context";
import { ActionContext, ActionContextType } from "../context/action.context";
import { ProjectsProps } from "../../App";
import { Popup, DeleteContainer } from "./delete-project.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
export type DeleteProjectProps = {
  projects: ProjectsProps[];
};

function DeleteProject({ projects }: DeleteProjectProps) {
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const { selectedID, setSelectedID } = useContext(
    SelectedIDContext
  ) as SelectedIDContextType;
  const project = projects[Number(selectedID) - 1];

  const gotCanceled = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/projects/${selectedID}`);
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
        <h4>Are you sure you want to delete {project.name}?</h4>
        <Button buttonType={BUTTON_TYPE_CLASSES.delete} onClick={gotCanceled}>
          Delete
        </Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.cancel} onClick={handleCancel}>
          Cancel
        </Button>
      </DeleteContainer>
    </Popup>
  );
}

export default DeleteProject;
