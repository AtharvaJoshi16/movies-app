"use client";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { notFound, usePathname } from "next/navigation";
import { useContext } from "react";
import { tabContext } from "../tabContext";
import { useRouter } from "next/navigation";

async function getListTypes(category: string, type: string) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/${category}/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((resp) => resp.data);
  return res;
}
export default async function ListTypes({
  params,
}: {
  params: { listtype: string };
}) {
  const router = useRouter();
  const path = usePathname();

  const { choice } = useContext(tabContext);
  if (
    choice === "tv" &&
    ["upcoming", "now_playing"].includes(path.split("/")[1])
  ) {
    router.push("/");
  }
  if (
    choice === "movie" &&
    ["on_the_air", "airing_today"].includes(path.split("/")[1])
  ) {
    router.push("/");
  }
  if (
    (!["popular", "upcoming", "top_rated", "now_playing"].includes(
      params.listtype
    ) &&
      choice === "movie") ||
    (!["on_the_air", "popular", "top_rated", "airing_today"].includes(
      params.listtype
    ) &&
      choice === "tv")
  ) {
    return notFound();
  }
  const data = await getListTypes(choice, params.listtype);
  return (
    <div className="flex justify-center flex-row flex-wrap gap-[30px] p-[30px]">
      {(data?.results as Array<any>)?.map((item) => {
        const {
          adult,
          genre_ids,
          id,
          title,
          original_title,
          original_language,
          backdrop_path,
          poster_path,
          overview,
          popularity,
          vote_average,
          vote_count,
          video,
          release_date,
        } = item;
        return (
          <MovieCard
            adult={adult}
            genreIds={genre_ids}
            id={id}
            category={choice}
            upcoming={params.listtype === "upcoming"}
            title={title}
            originalTitle={original_title}
            originalLanguage={original_language}
            posterPath={poster_path}
            backdropPath={backdrop_path}
            votesAverage={vote_average}
            votesCount={vote_count}
            releaseDate={release_date}
            video={video}
            overview={overview}
            popularity={popularity}
          />
        );
      })}
    </div>
  );
}
