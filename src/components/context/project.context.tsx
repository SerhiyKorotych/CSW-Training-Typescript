import React, { createContext, useState } from "react";
import { ProjectsProps } from "../../App";

export type ProjectContextType = {
  projects: ProjectsProps[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectsProps[]>>;
};

export const ProjectContext = createContext<ProjectContextType | null>(null);

type ChildProps = {
  children: React.ReactNode;
};

const ProjectProvider = ({ children }: ChildProps) => {
  const [projects, setProjects] = useState<ProjectsProps[]>([]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
