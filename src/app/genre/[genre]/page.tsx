"use client";
import { MoviesGrid } from "@/app/components/MoviesGrid";
import { tabContext } from "@/app/tabContext";
import axios from "axios";
import { useContext } from "react";

async function getMoviesByGenre(choice, id: string) {
  const res = axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/discover/${choice}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${id}`
    )
    .then((resp) => resp.data);
  return res;
}
export default async function GenreGrid({
  params,
}: {
  params: { genre: string };
}) {
  const { choice } = useContext(tabContext);
  const id = params?.genre?.split("-")[1];
  const data = await getMoviesByGenre(choice, id);
  return <MoviesGrid data={data} />;
}
