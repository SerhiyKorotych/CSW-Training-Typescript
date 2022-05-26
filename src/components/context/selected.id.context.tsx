import React, { createContext, useState } from "react";

export type SelectedIDContextType = {
  selectedID: string;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectedIDContext = createContext<SelectedIDContextType | null>(
  null
);

type ChildProps = {
  children: React.ReactNode;
};

const SelectedIDProvider = ({ children }: ChildProps) => {
  const [selectedID, setSelectedID] = useState("");

  return (
    <SelectedIDContext.Provider value={{ selectedID, setSelectedID }}>
      {children}
    </SelectedIDContext.Provider>
  );
};

export default SelectedIDProvider;
