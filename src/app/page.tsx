"use client";
import axios from "axios";
import { MoviesGrid } from "./components/MoviesGrid";
import { useContext, useEffect, useState } from "react";
import { tabContext } from "./tabContext";

async function getPopularData(category: string) {
  const result = await axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/${category}/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((resp) => resp.data);
  return result;
}

export default async function Home() {
  const { choice } = useContext(tabContext);
  const data = await getPopularData(choice);

  return (
    <>
      <MoviesGrid data={data} />?
    </>
  );
}
