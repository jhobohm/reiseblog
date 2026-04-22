"use client";

import dynamic from "next/dynamic";

const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
});

type MapPost = {
  _id: string;
  title: string;
  date: string;
  location?: string;
  slug?: string;
  coords: {
    lat: number;
    lng: number;
  };
};

type MapSectionProps = {
  posts: MapPost[];
};

export default function MapSection({ posts }: MapSectionProps) {
  return <RouteMap posts={posts} />;
}