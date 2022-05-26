import { useContext, useState, FormEvent } from "react";
import axios from "axios";
import { ActionContext, ActionContextType } from "../context/action.context";
import ProjectNameInput from "../../project-form-name/project-form-name.component";
import { Popup, AddProjectContainer } from "./add-project.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const AddProject = () => {
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const [name, setName] = useState("");

  const newProject = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/projects", {
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
      <AddProjectContainer onSubmit={newProject}>
        <h2>Add Project</h2>
        <ProjectNameInput setName={setName} />
        <Button buttonType={BUTTON_TYPE_CLASSES.add} type="submit">
          Add
        </Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.cancel} onClick={handleCancel}>
          Cancel
        </Button>
      </AddProjectContainer>
    </Popup>
  );
};

export default AddProject;
