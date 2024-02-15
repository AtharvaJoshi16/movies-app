"use client";
import { useState } from "react";
import { Choice, tabContext } from "./tabContext";
export const TabProvider = ({ children }) => {
  const [tabChoice, setTabChoice] = useState<Choice>("movie");
  return (
    <tabContext.Provider value={{ choice: tabChoice, setTabChoice }}>
      {children}
    </tabContext.Provider>
  );
};
