"use client";
import { Card, CardTitle } from "@/components/ui/card";
import axios from "axios";
import "./genre.css";
import Link from "next/link";
import { useContext } from "react";
import { tabContext } from "../tabContext";
async function getGenres(choice: string) {
  const res = await axios
    .get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/genre${
        choice === "tv" ? "/tv/" : "/"
      }list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    .then((resp) => resp.data);
  return res;
}

export default async function Genres() {
  const { choice } = useContext(tabContext);

  const data = await getGenres(choice);
  return (
    <div className="flex pl-[80px] pr-[80px] pt-[20px] pb-[20px] gap-[30px] flex-wrap justify-center">
      {data?.genres?.map((item, index) => (
        <Link
          key={`${item?.name}-${index}`}
          href={`/genre/${item?.name}-${item?.id}`}
        >
          <Card
            key={`${item?.name}-${item.id}`}
            className="p-[50px] w-[300px] genre-card"
          >
            <CardTitle className="text-center">
              <h3 style={{ fontSize: "40px" }} className="text-xxxl">
                {item?.name}
              </h3>
            </CardTitle>
          </Card>
        </Link>
      ))}
    </div>
  );
}
