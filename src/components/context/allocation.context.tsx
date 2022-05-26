import React, { createContext, useState } from "react";
import { EmployeeProps } from "../../App";
import { AllocationType } from "../allocations-employees/allocation-employees.component";

export type AllocationContextType = {
  allocations: AllocationType[];
  setAllocations: React.Dispatch<React.SetStateAction<AllocationType[]>>;
};

export const AllocationContext = createContext<AllocationContextType | null>(
  null
);

type ChildProps = {
  children: React.ReactNode;
};

const AllocationProvider = ({ children }: ChildProps) => {
  const [allocations, setAllocations] = useState<AllocationType[]>([]);

  return (
    <AllocationContext.Provider value={{ allocations, setAllocations }}>
      {children}
    </AllocationContext.Provider>
  );
};

export default AllocationProvider;
