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
    <YouTube
      className="w-fit m-auto h-fit [&>iframe]:aspect-video [&>iframe]:w-full"
      videoId={youtubeID}
      id={id}
      title={name}
    />
  );
};
