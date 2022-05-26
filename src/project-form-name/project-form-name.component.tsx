import { useContext, ChangeEvent } from "react";
import {
  ActionContext,
  ActionContextType,
} from "../components/context/action.context";
import { ProjectFormInput } from "./project-form-name.styles";

export type AddProjectType = {
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const ProjectNameInput = ({ setName }: AddProjectType) => {
  const { action, setAction } = useContext(ActionContext) as ActionContextType;

  const handleAddProject = () => {
    setAction("add-project");
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <ProjectFormInput
      placeholder="Please insert new project name"
      type="text"
      className="name-box"
      required
      onChange={handleName}
    ></ProjectFormInput>
  );
};

export default ProjectNameInput;
