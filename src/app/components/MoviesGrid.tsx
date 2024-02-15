"use client";
import { useContext } from "react";
import MovieCard from "./MovieCard";
import { tabContext } from "../tabContext";

export const MoviesGrid = ({ data }) => {
  const { choice } = useContext(tabContext);
  return (
    <div className="flex justify-center gap-[30px] flex-wrap p-[30px]">
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
            key={`${title}-${id}`}
            adult={adult}
            genreIds={genre_ids}
            id={id}
            title={title}
            category={choice}
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
};
