import Image from "next/image";
import Link from "next/link";
import type { Post } from "../sanity/lib/types";

type PostCardProps = {
  post: Post;
  isCurrentLocation?: boolean;
};

const kindLabels: Record<string, string> = {
  text: "Text",
  audio: "Audio",
  photo: "Foto",
  still: "Stiller Moment",
};

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return {
      day: "",
      month: "",
      year: date,
    };
  }

  return {
    day: parsed.toLocaleDateString("de-DE", { day: "2-digit" }),
    month: parsed.toLocaleDateString("de-DE", { month: "short" }),
    year: parsed.toLocaleDateString("de-DE", { year: "numeric" }),
  };
}

export default function PostCard({ post, isCurrentLocation }: PostCardProps) {
  const date = formatDate(post.date);
  const imageUrls =
    post.images
      ?.map((image) => image.asset?.url)
      .filter((url): url is string => Boolean(url)) ?? [];

  const isSilentMoment = post.kind === "still";

  return (
    <article
      id={`post-${post._id}`}
      className={`feed-entry ${isSilentMoment ? "feed-entry-silent" : ""} ${
        isCurrentLocation ? "feed-entry-current" : ""
      }`}
    >
      <aside className="feed-date">
        <span className="feed-date-day">{date.day}</span>
        <span className="feed-date-month">{date.month}</span>
        <span className="feed-date-year">{date.year}</span>
      </aside>

      <div className="feed-card">
        <div className="feed-card-top">
          {post.kind && (
            <span className={`feed-badge feed-badge-${post.kind}`}>
              {kindLabels[post.kind] ?? "Beitrag"}
            </span>
          )}

          {post.location && (
            <span className="feed-location">
              {isCurrentLocation && <span className="location-pulse" />}
              {post.location}
            </span>
          )}
        </div>

        {imageUrls.length > 0 && !isSilentMoment && (
          <div className="feed-gallery">
            <div className="feed-main-image">
              <Image
                src={imageUrls[0]}
                alt={post.title}
                width={1200}
                height={800}
                className="feed-image"
              />
            </div>

            {imageUrls.length > 1 && (
              <div className="feed-thumb-grid">
                {imageUrls.slice(1, 4).map((url, index) => (
                  <div key={url} className="feed-thumb">
                    <Image
                      src={url}
                      alt={`${post.title} ${index + 2}`}
                      width={400}
                      height={280}
                      className="feed-image"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="feed-content">
          {isCurrentLocation && (
            <p className="feed-current-label">Aktueller Standort</p>
          )}

          <h3 className="feed-title">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h3>

          {post.excerpt && <p className="feed-excerpt">{post.excerpt}</p>}

          {post.audio?.asset?.url && (
            <p className="feed-audio-note">Audioaufnahme vorhanden</p>
          )}

          <Link href={`/posts/${post.slug}`} className="feed-read-link">
            Beitrag lesen
          </Link>
        </div>
      </div>
    </article>
  );
}