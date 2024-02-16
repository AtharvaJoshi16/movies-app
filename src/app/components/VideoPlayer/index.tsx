"use client";
import { Card } from "@/components/ui/card";
import YouTube from "react-youtube";
import "./VideoPlayer.css";

interface VideoPlayerProps {
  youtubeID: string;
  id: string;
  name: string;
  publishedAt: string;
}

export const VideoPlayer = ({
  youtubeID,
  id,
  name,
  publishedAt,
}: VideoPlayerProps) => {
  const date = new Date(publishedAt);
  const formattedDate = date.toLocaleString();
  return (
    <Card className="m-auto bg-slate-100 ml-[10px] mr-[10px] aspect-[16/9] p-[30px] flex flex-col gap-[20px]">
      <YouTube className="m-auto" videoId={youtubeID} id={id} title={name} />
      Published {formattedDate}
    </Card>
  );
};
