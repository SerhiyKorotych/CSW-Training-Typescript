import React, { createContext, useState } from "react";

export type ActionContextType = {
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
};

export const ActionContext = createContext<ActionContextType | null>(null);

type ChildProps = {
  children: React.ReactNode;
};

const ActionProvider = ({ children }: ChildProps) => {
  const [action, setAction] = useState("");

  return (
    <ActionContext.Provider value={{ action, setAction }}>
      {children}
    </ActionContext.Provider>
  );
};

export default ActionProvider;
