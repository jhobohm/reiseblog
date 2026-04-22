import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../../data/posts";
import PostGallery from "../../../components/PostGallery";
import AudioBlock from "../../../components/AudioBlock";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const post = posts.find((p) => p.slug === id);

  if (!post) {
    notFound();
  }

  return (
    <main className="detail-page">
      <Link href="/" className="back-link">
        ← Zurück zur Übersicht
      </Link>

      <article>
        {post.images?.length > 0 && (
          <>
            {/* HERO-BILD */}
            <div className="detail-hero-image-wrap">
              <img
                src={post.images[0]}
                alt={`${post.title} 1`}
                className="detail-hero-image"
              />
            </div>

            {/* RESTLICHE BILDER */}
            {post.images.length > 1 && (
              <PostGallery
                images={post.images.slice(1)}
                title={post.title}
              />
            )}
          </>
        )}

        <h1 className="detail-title">{post.title}</h1>

        <p className="detail-meta">
          {post.location} · {post.date}
        </p>

        {post.audio && (
          <AudioBlock
            src={post.audio}
            title={post.audioTitle}
            transcriptSegments={post.transcriptSegments}
          />
        )}

        <div className="detail-content">{post.content}</div>
      </article>
    </main>
  );
}