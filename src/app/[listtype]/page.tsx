"use client";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { notFound, usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { tabContext } from "../tabContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

async function getListTypes(category: string, type: string, page?: number) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/${category}/${type}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&page=${page ? page : 1}`
    )
    .then((resp) => resp.data);
  return res;
}

export default function ListTypes({
  params,
}: {
  params: { listtype: string };
}) {
  const router = useRouter();
  const path = usePathname();
  const [data, setData] = useState<any>();
  const { choice } = useContext(tabContext);
  useEffect(() => {
    if (
      choice === "tv" &&
      ["upcoming", "now_playing"].includes(path.split("/")[1])
    ) {
      router.push("/");
      return;
    }
    if (
      choice === "movie" &&
      ["on_the_air", "airing_today"].includes(path.split("/")[1])
    ) {
      router.push("/");
      return;
    }

    async function setUpdatedOrInitialData() {
      const apiData = await getListTypes(choice, params.listtype);
      setData(apiData);
    }
    setUpdatedOrInitialData();
  }, [choice]);

  const loadMoreData = async () => {
    const copyOfData = { ...data };
    const newPageData = await getListTypes(
      choice,
      params.listtype,
      copyOfData?.page + 1
    );
    copyOfData?.results?.push(...newPageData?.results);
    setData(copyOfData);
  };

  return (
    <div className="flex flex-col mb-[40px]">
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
              key={`${original_title}-${id}`}
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
      <Button
        size="icon"
        className="m-auto bg-sky-600 hover:bg-sky-500 w-[60px] h-[60px]"
        variant="outline"
        onClick={loadMoreData}
      >
        <Plus fill="white" color="white" width={36} height={36} />
      </Button>
    </div>
  );
}
