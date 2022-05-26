import React, { createContext, useState } from "react";
import { EmployeeProps } from "../../App";

export type EmployeesContextType = {
  employees: EmployeeProps[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeProps[]>>;
};

export const EmployeeContext = createContext<EmployeesContextType | null>(null);

type ChildProps = {
  children: React.ReactNode;
};

const EmployeesProvider = ({ children }: ChildProps) => {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeesProvider;
