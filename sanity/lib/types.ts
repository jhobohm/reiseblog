import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  asset?: {
    _id?: string;
    url?: string;
  };
};

export type TranscriptSegment = {
  time: number;
  text: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  kind?: string;
  date: string;
  location?: string;
  excerpt?: string;
  content?: PortableTextBlock[] | null;
  coords?: {
    lat: number;
    lng: number;
  };
  audio?: {
    asset?: {
      url?: string;
    };
  };
  audioTitle?: string;
  images?: SanityImage[];
  transcriptSegments?: TranscriptSegment[] | null;
};

export type MapPost = {
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