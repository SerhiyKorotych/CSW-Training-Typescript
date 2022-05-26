import EmployeeTables from "../components/employee-tables/employee-tables.component";
import ProjectTables from "../components/project-tables/project-tables.component";
import { useState } from "react";
import {
  SwitchTables,
  HomepageContainer,
  SelectedTables,
  Title,
} from "./home.styles";
import Header from "../components/add-employees/header/header.component";
import { Link, Outlet } from "react-router-dom";

const Homepage = () => {
  const [switchButton, setSwitchButton] = useState("");
  const [active, setActive] = useState("");

  return (
    <HomepageContainer>
      <Header />
      <SwitchTables>
        <Title>
          <Link
            to="/employees"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SelectedTables>Employees</SelectedTables>
          </Link>
        </Title>
        <Title>
          <Link
            to="/projects"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SelectedTables>Projects</SelectedTables>
          </Link>
        </Title>
      </SwitchTables>
      {switchButton == "employees" && <EmployeeTables />}
      {switchButton == "projects" && <ProjectTables />}
      <Outlet />
    </HomepageContainer>
  );
};

export default Homepage;
