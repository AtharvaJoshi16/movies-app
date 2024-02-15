"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import styles from "./search.module.css";
import { MoviesGrid } from "../components/MoviesGrid";
import Image from "next/image";
import { useContext } from "react";
import { Choice, tabContext } from "../tabContext";

async function getMoviesBySearch(query: string, choice: Choice) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/search/${choice}?query=${query}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((resp) => resp.data);

  return res;
}

export default async function SearchPage() {
  const query = useSearchParams().get("q");
  const { choice } = useContext(tabContext);
  const data = await getMoviesBySearch(query!, choice);
  if (!!data?.results?.length) {
    return <MoviesGrid data={data} />;
  }
  return (
    <Image
      alt="no-result"
      src="/no-result.jpg"
      width={400}
      height={400}
      className={styles.no_result}
    />
  );
}
