import Link from "next/link";
import Image from "next/image";
import { posts } from "../data/posts";
import MapSection from "../components/MapSection";

export default function Home() {
  const feedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentPost = feedPosts[0];
  const kindLabels: Record<string, string> = {
   text: "Text",
   audio: "Audio",
   photo: "Foto",
   still: "Stiller Moment",
  };
  return (
    <main className="container-page">
      <section className="hero">
        <p className="hero-kicker">Reisetagebuch</p>
        <h1 className="hero-title">Zwischen Aufbruch, Straße und Stille.</h1>
        <p className="hero-text">
          Eine Reise von Ostdeutschland nach Osten. Orte werden zu Kapiteln,
          Stimmen zu Erinnerungen und die Route erzählt die Geschichte.
        </p>
      </section>

      <section className="map-panel">
        <h2 className="section-heading">Die Route</h2>
        <p className="section-subtext">
          Die Karte ist das Herzstück dieser Reise. Jeder Punkt führt zu einem
          Moment, jeder Abschnitt zu einem neuen Kapitel.
        </p>
        <MapSection />
      </section>

      <section>
        <h2 className="section-heading">Unterwegs</h2>
        <p className="section-subtext">
          Die neuesten Einträge stehen oben. Klick auf einen Ort in der Karte,
          um direkt zum passenden Beitrag zu springen.
        </p>

        <div className="feed">
          {feedPosts.map((post) => (
            <article key={post.id} id={`post-${post.id}`} className={`post-card ${ post.id === currentPost.id ? "post-card-current" : ""}`}
>
              {post.images?.length > 0 && (
               <div>
                <div className="post-image-wrap">
                 <Image src={post.images[0]} alt={post.title} width={1200} height={800} className="post-image"/>
                </div>

                {post.images.length > 1 && (
                 <div className="post-thumbs">
                  {post.images.slice(1, 4).map((img, index) => (
                   <div key={index} className="post-thumb-wrap">
                    <Image src={img} alt={`${post.title} ${index + 2}`} width={300} height={220} className="post-thumb" />
                   </div>
                 ))}
               </div>
               )}
             </div>
             )}

              <div>
               <div className="post-topline">
                <span className={`post-kind post-kind-${post.kind}`}>
                  {kindLabels[post.kind] ?? "Beitrag"}
                </span>
                <p className="post-meta">
                  {post.location} · {post.date}
                </p>
               </div>
               {post.id === currentPost.id && (
                 <div className="current-label">Aktueller Standort</div>
              )}
                <h3 className="post-title">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="post-excerpt">{post.text}</p>

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