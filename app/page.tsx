import Link from "next/link";
import Image from "next/image";
import MapSection from "../components/MapSection";
import { client } from "../sanity/lib/client";
import { POSTS_QUERY, MAP_POSTS_QUERY } from "../sanity/lib/queries";
import type { Post, MapPost } from "../sanity/lib/types";

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
            <article
              key={post._id}
              id={`post-${post._id}`}
              className={`post-card ${post.kind === "still" ? "post-card-still" : ""
                } ${currentPost && post._id === currentPost._id ? "post-card-current" : ""}`}
            >
              {post.images?.[0]?.asset?.url && (
                <div>
                  <div className="post-image-wrap">
                    <Image
                      src={post.images[0].asset.url}
                      alt={post.title}
                      width={1200}
                      height={800}
                      className="post-image"
                    />
                  </div>

                  {post.images.length > 1 && (
                    <div className="post-thumbs">
                      {post.images.slice(1, 4).map((img, index) => (
                        <div key={index} className="post-thumb-wrap">
                          {img.asset?.url && (
                            <Image
                              src={img.asset.url}
                              alt={`${post.title} ${index + 2}`}
                              width={300}
                              height={220}
                              className="post-thumb"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div>
                <div className="post-topline">
                  {post.kind && (
                    <span className={`post-kind post-kind-${post.kind}`}>
                      {kindLabels[post.kind] ?? "Beitrag"}
                    </span>
                  )}

                  <p className="post-meta">
                    {post.location} · {post.date}
                  </p>
                </div>

                {currentPost && post._id === currentPost._id && (
                  <div className="current-label">Aktueller Standort</div>
                )}

                <h3 className="post-title">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="post-excerpt">{post.excerpt}</p>

                <Link href={`/posts/${post.slug}`} className="post-link">
                  Beitrag lesen
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}