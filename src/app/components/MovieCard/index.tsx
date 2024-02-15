import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import "./MovieCard.css";
import { Heart, Star } from "lucide-react";
import Link from "next/link";

interface MovieCardProps {
  adult?: boolean;
  category?: "movie" | "tv";
  upcoming?: boolean;
  backdropPath?: string;
  genreIds?: number[];
  id: number;
  originalLanguage?: string;
  originalTitle?: string;
  overview?: string;
  popularity?: number;
  posterPath?: string;
  releaseDate?: string;
  title: string;
  video?: boolean;
  votesAverage?: number;
  votesCount?: number;
}

const MovieCard = ({
  adult,
  backdropPath,
  genreIds,
  id,
  upcoming,
  category = "movie",
  originalLanguage,
  originalTitle,
  overview,
  popularity,
  posterPath,
  releaseDate,
  title,
  video,
  votesAverage,
  votesCount,
}: MovieCardProps) => {
  const date = new Date(releaseDate ?? "");
  const month = date.toLocaleString("default", { month: "long" });
  return (
    <Link href={`/${category}/${id}`}>
      <Card id={`${id}`} className="w-[250px] movie-card">
        <CardHeader className="p-[0px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${posterPath}`}
            width={250}
            height={275}
            alt={title}
            className="rounded-tl rounded-tr"
          />
        </CardHeader>
        <CardContent className="pb-0">
          {upcoming && (
            <p className="flex flex-col gap-[2px] text-center p-[10px]">
              <span className="text-sm">Releasing</span>
              <br />
              <span className="font-bold text-xl release-date">{`${month} ${date.getDate()}`}</span>
            </p>
          )}
        </CardContent>
        <CardDescription className="p-4">
          <p className="overview-text">{overview}</p>
        </CardDescription>
        <CardFooter className="flex p-4  justify-between items-center">
          <div className="flex flex-row items-center justify-center gap-[4px]">
            <Heart width={22} height={22} fill="#f55d4c" color="#f55d4c" />
            <p className="text-sm">{votesCount}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-[4px]">
            <Star width={22} height={22} fill="#f5df18" color="#f5df18" />
            {votesAverage && (
              <p className="text-sm">{`${
                Math.round(votesAverage * 10) / 10
              }/10`}</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default MovieCard;
