import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import EmployeesProvider from "./components/context/employees.context";
import ProjectProvider from "./components/context/project.context";
import ActionProvider from "./components/context/action.context";
import SelectedIDProvider from "./components/context/selected.id.context";
import AllocationProvider, {
  AllocationContext,
} from "./components/context/allocation.context";

if (process.env.NODE_ENV === "development") {
  require("./mock/browser");
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AllocationProvider>
        <EmployeesProvider>
          <ProjectProvider>
            <ActionProvider>
              <SelectedIDProvider>
                <App />
              </SelectedIDProvider>
            </ActionProvider>
          </ProjectProvider>
        </EmployeesProvider>
      </AllocationProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
