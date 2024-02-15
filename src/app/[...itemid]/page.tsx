import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { Heart, ShoppingCart, Star, TicketPercent } from "lucide-react";
import Image from "next/image";

async function getDetail(id: string, category: string) {
  const res = axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/${category}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((resp) => resp.data);
  return res;
}

async function getGenres(category?: string) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/genre${
        category ? "/tv/" : "/"
      }list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((resp) => resp.data);
  return res;
}

async function getProviders(id: string, category: string) {
  const res = axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/${category}/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((resp) => resp.data);
  return res;
}

export default async function MovieDetail({
  params,
}: {
  params: { itemid: string[] };
}) {
  const data = await getDetail(params?.itemid[1], params?.itemid[0]);
  const providers = await getProviders(params?.itemid[1], params?.itemid[0]);
  const allGenres = await getGenres(params?.itemid[0]);
  const movieGenres = allGenres?.genres?.filter((item) =>
    data?.genres?.some(
      (genre) => genre.id === item.id && genre.name === item.name
    )
  );
  const {
    adult,
    genres,
    imdb_id,
    original_title,
    original_language,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    revenue,
    status,
    tagline,
    title,
    video,
    vote_average,
    vote_count,
  } = data;
  const date = new Date(release_date ?? data?.first_air_date);
  const month = date.toLocaleString("default", { month: "long" });
  return (
    <div className="max-[360px]:m-[24px] max-[768px]:m-[48px] max-[1024px]:m-[92px] mt-[40px] mb-[40px] mr-auto ml-auto lg:ml-[92px] lg:mr-[92px]">
      <div className="flex justify-center max-[768px]:flex-col gap-[30px] lg:gap-[80px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${poster_path}`}
          width={400}
          className="max-[360px]:h-[300px] max-[360px]:w-[200px] max-[768px]:h-[400px] max-[768px]:w-[300px] max-[768px]:m-auto h-[600px] max-h-[600px]"
          height={400}
          alt={`${title}`}
        />
        <div className="flex flex-col">
          <h1 className="text-4xl flex items-center gap-[25px] font-bold">
            {original_title ?? data?.name}
            {adult && (
              <span>
                <Image
                  src="/adult-icon.jpeg"
                  width={46}
                  height={36}
                  alt="adult"
                />
              </span>
            )}
          </h1>
          {!!data?.number_of_seasons && (
            <h6 className="mt-[10px] flex items-center gap-[10px] text-slate-600">
              {data?.number_of_seasons > 1
                ? `${data?.number_of_seasons} Seasons`
                : "1 Season"}
              {"  ,"}
              <span>{data?.number_of_episodes} episodes</span>
            </h6>
          )}
          <h3 className="flex gap-[10px] mt-[20px] text-xl">
            {params?.itemid[0] === "movie" &&
              (status === "released" ? "Released" : "Releasing")}
            {params?.itemid[0] === "tv" && "First Aired"}
            <span>{`${month} ${date.getDate()}, ${date.getFullYear()}`}</span>
          </h3>
          <div className="flex mt-[20px] items-center gap-[15px]">
            {movieGenres?.map((genre) => {
              return (
                <Badge
                  key={`${genre?.name}-${genre?.id}`}
                  variant="destructive"
                >
                  {genre?.name}
                </Badge>
              );
            })}
          </div>
          <div className="flex mt-[40px] items-center justify-between w-[250px]">
            <div className="flex flex-row items-center justify-center gap-[10px]">
              <Heart width={36} height={36} fill="#f55d4c" color="#f55d4c" />
              <p className="text-lg font-bold">{vote_count}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-[10px]">
              <Star width={36} height={36} fill="#f5df18" color="#f5df18" />
              {vote_average && (
                <p className="text-lg font-bold">{`${
                  Math.round(vote_average * 10) / 10
                }/10`}</p>
              )}
            </div>
          </div>
          <p className="lg:w-[700px] mt-[40px] text-justify">{overview}</p>
          <div className="mt-[40px]">
            {!!production_companies?.length && (
              <h2 className="text-2xl font-bold mb-[20px]">Produced By</h2>
            )}
            <div className="flex flex-wrap items-center gap-[30px]">
              {production_companies?.map((item) => {
                return (
                  <Card
                    className={
                      item?.logo_path
                        ? "w-[200px] flex items-center justify-center"
                        : "w-[200px] flex flex-col items-center justify-center"
                    }
                    key={`${item?.name}-${item?.id}`}
                  >
                    <CardHeader>
                      <Image
                        src={
                          item?.logo_path
                            ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${item?.logo_path}`
                            : "/no-image.png"
                        }
                        width={item?.logo_path ? 150 : 64}
                        height={item?.logo_path ? 150 : 64}
                        alt={item?.name}
                      />
                    </CardHeader>
                    {!item?.logo_path && (
                      <CardContent>
                        <h3 className="text-center font-bold text-xl">
                          {item?.name}
                        </h3>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[40px]">
        {!!providers?.results?.["US"]?.["buy"]?.length &&
          !!providers?.results?.["US"]?.["rent"]?.length && (
            <h2 className="text-2xl font-bold mb-[20px]">Available on</h2>
          )}
        {!!providers?.results?.["US"]?.["buy"]?.length && (
          <>
            <h4 className="ml-[20px] text-xl flex items-center font-bold mb-[20px]">
              Buy
              <span className="ml-[10px]">
                <ShoppingCart
                  width={28}
                  height={28}
                  fill="#f5df18"
                  color="#a3940d"
                />
              </span>
            </h4>
            <div className="flex flex-wrap items-center gap-[30px]">
              {!!providers?.results?.["US"]?.["buy"]?.length &&
                providers?.results?.["US"]?.["buy"]?.map((item) => {
                  return (
                    <Card
                      key={`${item?.provider_name}-${item?.provider_id}`}
                      className="w-[200px] flex items-center justify-center"
                    >
                      <CardHeader>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${item?.logo_path}`}
                          width={100}
                          height={100}
                          alt={item?.provider_name}
                        />
                      </CardHeader>
                    </Card>
                  );
                })}
            </div>
          </>
        )}
        {!!providers?.results?.["US"]?.["rent"]?.length && (
          <>
            <h4 className="ml-[20px] text-xl flex items-center mt-[40px] font-bold mb-[20px]">
              Rent
              <span className="ml-[10px]">
                <TicketPercent
                  width={28}
                  height={28}
                  fill="#f5df18"
                  color="#a3940d"
                />
              </span>
            </h4>
            <div className="flex flex-wrap items-center gap-[30px]">
              {providers?.results?.["US"]?.["rent"]?.map((item) => {
                return (
                  <Card
                    key={`${item?.provider_name}-${item?.provider_id}`}
                    className="w-[200px] flex items-center justify-center"
                  >
                    <CardHeader>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${item?.logo_path}`}
                        width={100}
                        height={100}
                        alt={item?.provider_name}
                      />
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
