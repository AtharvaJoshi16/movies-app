"use client";
import { Dispatch, SetStateAction, createContext } from "react";

interface TabContextProps {
  choice: Choice;
  setTabChoice: Dispatch<SetStateAction<Choice>>;
}

export const tabContext = createContext<TabContextProps>({
  choice: "movie",
  setTabChoice: () => {},
});

export type Choice = "movie" | "tv";
