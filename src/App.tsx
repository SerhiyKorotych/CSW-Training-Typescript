import { useState, useEffect, useContext } from "react";
import axios from "axios";
import EmployeeTables from "./components/employee-tables/employee-tables.component";
import ProjectTables from "./components/project-tables/project-tables.component";
import {
  EmployeeContext,
  EmployeesContextType,
} from "./components/context/employees.context";
import AddEmployee from "./components/add-employees/add-employees.component";
import {
  ProjectContext,
  ProjectContextType,
} from "./components/context/project.context";
import Homepage from "./pages/home.page";
import {
  ActionContext,
  ActionContextType,
} from "./components/context/action.context";
import { Route, Routes } from "react-router-dom";

export type EmployeeProps = {
  id: number;
  name: string;
  startDate: string;
  role: string;
  platoon: string;
};

export type ProjectsProps = {
  id: number;
  name: string;
};

const App = () => {
  const { action, setAction } = useContext(ActionContext) as ActionContextType;
  const { projects, setProjects } = useContext(
    ProjectContext
  ) as ProjectContextType;
  const { employees, setEmployees } = useContext(
    EmployeeContext
  ) as EmployeesContextType;
  const getEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axios.get("/api/projects");
      setProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getEmployees();
    getProjects();
  }, [action]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/employees" element={<EmployeeTables />} />
          <Route path="/projects" element={<ProjectTables />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
