import Link from "next/link";
import Image from "next/image";
import MapSection from "../components/MapSection";
import { client } from "../sanity/lib/client";
import { POSTS_QUERY, MAP_POSTS_QUERY } from "../sanity/lib/queries";
import type { Post, MapPost } from "../sanity/lib/types";
import PostCard from "../components/PostCard";

type SanityImage = {
  asset?: {
    _id?: string;
    url?: string;
  };
};


const kindLabels: Record<string, string> = {
  text: "Text",
  audio: "Audio",
  photo: "Foto",
  still: "Stiller Moment",
};

export default async function Home() {
  const posts: Post[] = await client.fetch(POSTS_QUERY);
  const mapPosts: MapPost[] = await client.fetch(MAP_POSTS_QUERY);

  const currentPost = posts[0];

  return (
    <main className="container-page">
      <section className="hero">
        <p className="hero-kicker">Reisetagebuch</p>
        <h1 className="hero-title">Zwischen Aufbruch, Straße und Stille.</h1>
        <p className="hero-text">
          Eine fortlaufende Reise zwischen Aufbruch und Ankunft. Die Route wächst mit
          jedem Ort, und jeder Eintrag wird zu einem Kapitel dieses Weges.
        </p>
      </section>

      <section className="map-panel">
        <h2 className="section-heading">Die Route</h2>
        <p className="section-subtext">
          Die Karte ist das Herzstück dieser Reise. Jeder Punkt führt zu einem
          Moment, jeder Abschnitt zu einem neuen Kapitel.
        </p>
        <MapSection posts={mapPosts} />
      </section>

      <section>
        <h2 className="section-heading">Unterwegs</h2>
        <p className="section-subtext">
          Die neuesten Einträge stehen oben. Klick auf einen Ort in der Karte,
          um direkt zum passenden Beitrag zu springen.
        </p>

        <div className="feed">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              isCurrentLocation={currentPost && post._id === currentPost._id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}